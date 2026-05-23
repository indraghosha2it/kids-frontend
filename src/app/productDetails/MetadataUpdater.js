'use client';

import { useEffect } from 'react';

export default function MetadataUpdater({ product }) {
  useEffect(() => {
    if (!product) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from product metaSettings or generate fallback for ToyMart
        const metaTitle = product.metaSettings?.metaTitle || 
          `${product.productName} - Premium Kids Toy | ToyMart Bangladesh`;
        
        const metaDescription = product.metaSettings?.metaDescription || 
          `${product.productName} - Premium quality kids toy from ToyMart Bangladesh. ${product.shortDescription?.substring(0, 150) || ''} Safe, educational, and fun for children ages ${product.ageGroup || '3+'}. ✓COD ✓bKash/Nagad ✓Free Delivery.`;
        
        const metaKeywords = product.metaSettings?.metaKeywords || [
          product.productName,
          product.category?.name,
          product.tags,
          'kids toys',
          'educational toys',
          'Bangladesh toy store',
          'toymart',
          ...(product.tags || [])
        ].flat().filter(Boolean);
        
        // Get primary image
        const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                             product.images?.[0]?.url || 
                             '/toy-default-og.jpg';
        
        // Update document title
        document.title = metaTitle;
        
        // Helper function to update or create meta tags
        const updateOrCreateMetaTag = (name, content, isProperty = false) => {
          if (!content) return;
          
          let meta;
          if (isProperty) {
            meta = document.querySelector(`meta[property="${name}"]`);
          } else {
            meta = document.querySelector(`meta[name="${name}"]`);
          }
          
          if (meta) {
            meta.setAttribute('content', content);
          } else {
            meta = document.createElement('meta');
            if (isProperty) {
              meta.setAttribute('property', name);
            } else {
              meta.setAttribute('name', name);
            }
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        };
        
        // Update basic meta tags
        updateOrCreateMetaTag('description', metaDescription);
        updateOrCreateMetaTag('keywords', Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords);
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://toymart.com.bd/productDetails?id=${product._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'product', true);
        updateOrCreateMetaTag('og:site_name', 'ToyMart', true);
        updateOrCreateMetaTag('og:availability', product.stockQuantity > 0 ? 'in stock' : 'out of stock', true);
        updateOrCreateMetaTag('og:price:amount', product.discountPrice || product.regularPrice, true);
        updateOrCreateMetaTag('og:price:currency', 'BDT', true);
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        updateOrCreateMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateMetaTag('twitter:site', '@ToyMartBD');
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        const canonicalUrl = `https://toymart.com.bd/productDetails?id=${product._id}`;
        if (canonical) {
          canonical.setAttribute('href', canonicalUrl);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', canonicalUrl);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#product-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for better SEO - ToyMart specific
        const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice 
          ? product.discountPrice 
          : product.regularPrice;
        
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.productName,
          "description": metaDescription,
          "image": primaryImage,
          "sku": product.skuCode || product._id,
          "mpn": product.skuCode || product._id,
          "brand": {
            "@type": "Brand",
            "name": product.brand || "ToyMart",
            "logo": "https://toymart.com.bd/logo.png"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "ToyMart",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": currentPrice,
            "priceCurrency": "BDT",
            "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "url": `https://toymart.com.bd/productDetails?id=${product._id}`,
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "BD"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              }
            }
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Age Group",
              "value": product.ageGroup || "3+ years"
            },
            {
              "@type": "PropertyValue",
              "name": "Category",
              "value": product.category?.name || product.categoryName || "Kids Toy"
            },
            {
              "@type": "PropertyValue",
              "name": "Material",
              "value": product.materials || "Non-toxic, Child-safe materials"
            },
            {
              "@type": "PropertyValue",
              "name": "Origin",
              "value": "Bangladesh"
            },
            {
              "@type": "PropertyValue",
              "name": "Safety Certified",
              "value": "ASTM, EN71 Certified"
            }
          ]
        };
        
        // Add subcategory info if available
        if (product.subcategoryName) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Subcategory",
            "value": product.subcategoryName
          });
        }
        
        // Add educational benefits if available
        if (product.educationalBenefits) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Educational Benefits",
            "value": product.educationalBenefits
          });
        }
        
        // Add dimensions if available
        if (product.dimensions) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Dimensions",
            "value": product.dimensions
          });
        }
        
        // Add weight if available
        if (product.weight) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Weight",
            "value": product.weight,
            "unitText": product.weightUnit || "kg"
          });
        }
        
        // Add colors if available
        if (product.colors && product.colors.length > 0) {
          jsonLd.color = product.colors;
        }
        
        // Add rating if available
        if (product.rating && product.rating > 0) {
          jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount || 0,
            "bestRating": "5",
            "worstRating": "1"
          };
        }
        
        // Add COD availability
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Cash on Delivery",
          "value": product.codAvailable !== false ? "Available" : "Not Available"
        });
        
        // Add warranty information
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Warranty",
          "value": "30 Days Manufacturing Warranty"
        });
        
        // Add return policy
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Return Policy",
          "value": "7 Days Return Policy for defective products"
        });
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'product-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        // Add organization JSON-LD if not present
        const existingOrgJsonLd = document.querySelector('#organization-json-ld');
        if (!existingOrgJsonLd) {
          const orgJsonLd = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "ToyMart",
            "url": "https://toymart.com.bd",
            "logo": "https://toymart.com.bd/logo.png",
            "description": "Bangladesh's premier kids toy e-commerce website. Shop educational toys, Montessori toys, STEM kits, RC cars, outdoor toys, dolls and more.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka",
              "postalCode": "1212"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+8801234567890",
              "email": "support@toymart.com.bd",
              "availableLanguage": ["English", "Bengali"]
            },
            "sameAs": [
              "https://www.facebook.com/toymartbd",
              "https://www.instagram.com/toymart.bd"
            ],
            "priceRange": "৳200 - ৳20000",
            "currenciesAccepted": "BDT",
            "paymentAccepted": "Cash on Delivery, bKash, Nagad, Credit Card"
          };
          
          const orgScript = document.createElement('script');
          orgScript.id = 'organization-json-ld';
          orgScript.type = 'application/ld+json';
          orgScript.textContent = JSON.stringify(orgJsonLd);
          document.head.appendChild(orgScript);
        }
        
        console.log('Metadata updated for ToyMart product:', product.productName);
        console.log('JSON-LD added for product:', product.productName);
        
      } catch (error) {
        console.error('Error updating metadata:', error);
      }
    };
    
    updateMetadata();
  }, [product]);
  
  return null;
}