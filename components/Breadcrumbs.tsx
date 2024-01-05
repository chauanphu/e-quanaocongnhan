import React from "react";
import styles from "styles/Breadcrumbs.module.scss";
import StructuredData from "./structured-data";

interface Breadcrumb {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: breadcrumbs[breadcrumbs.length - 1].label,
    itemListElement: breadcrumbs.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: link.label,
      item: `${process.env.NEXT_PUBLIC_DOMAIN}${link.url}`,
    })),
  };
  return (
    <>
      <StructuredData data={structuredData} />
      <nav aria-label="breadcrumb" className="container">
        <ol className={styles.breadcrumb}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className={styles.breadcrumbItem}>
              <a href={breadcrumb.url}>{breadcrumb.label}</a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
