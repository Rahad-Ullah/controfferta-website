import Image from "next/image";

export function BlogCover({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    return <div className="absolute inset-0 bg-slate-100" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={95}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
