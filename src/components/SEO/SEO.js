import React from "react";
import Helmet from "react-helmet";
import { string } from "prop-types";

function SEO({ title, description }) {
  const schemaOrgJSONLD = [
    {
      "@context": "https://www.schema.org",
      "@type": "product",
      brand: "danilucaci.com",
      logo: "https://www.todos.danilucaci.com/logo.png",
      name: "Todos",
      image: "http://www.todos.danilucaci.com/image.png",
      description: { description },
    },
    {
      "@context": "http://schema.org/",
      "@type": "Person",
      name: "Dani Lucaci",
      alternateName: "Daniel Marian Lucaci",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressCountry: "Spain",
      },
      url: "www.danilucaci.com",
      sameAs: [
        "https://twitter.com/danilucaci",
        "https://www.linkedin.com/in/danilucaci/",
        "https://github.com/danilucaci",
      ],
      jobTitle: "Product Designer and Front-End Developer",
      worksFor: {
        "@type": "Organization",
        name: "danilucaci.com",
      },
    },
  ];

  return (
    <Helmet>
      <html lang="en" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
      />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:site" content="@danilucaci" />
      <meta name="twitter:creator" content="@danilucaci" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.todos.danilucaci.com" />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}

SEO.propTypes = {
  title: string.isRequired,
  description: string,
};

SEO.defaultProps = {
  description:
    "A todo app made with react, redux and firebase. | A personal project by Dani Lucaci.",
};

export default SEO;
