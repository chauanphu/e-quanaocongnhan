-- CreateTable
CREATE TABLE "Category" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentSlug" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Product" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "image" TEXT,
    "short_description" TEXT,
    "long_description" TEXT,
    "price" INTEGER NOT NULL,
    "categorySlug" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("slug")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentSlug_fkey" FOREIGN KEY ("parentSlug") REFERENCES "Category"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "Category"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
