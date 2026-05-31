import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title, 
    description, 
    image = '/og-image.jpg',
    url = window.location.href,
    type = 'website'
}) => {
    const siteName = 'SoapSo - Натуральное мыло ручной работы';
    const defaultDescription = 'Интернет-магазин натурального мыла ручной работы. Морская свежесть, овсяное молочко, лавандовое облако и другие ароматы.';
    
    const seo = {
        title: title ? `${title} | SoapSo - Натуральное мыло ручной работы` : siteName,
        description: description || defaultDescription,
        image: image.startsWith('http') ? image : `${window.location.origin}${image}`,
        url: url || window.location.href,
    };

    return (
        <Helmet>
            {/* Основные мета-теги */}
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content={siteName} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            
            {/* Канонический URL */}
            <link rel="canonical" href={seo.url} />
            
            {/* Дополнительные мета-теги */}
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="Russian" />
        </Helmet>
    );
};

export default SEO;