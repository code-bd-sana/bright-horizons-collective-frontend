import Image from 'next/image';

type ActivityArtworkProps = {
  src: string;
  alt: string;
  focalPoint?: string;
};

// Exact Bézier path exported from Figma's Star 3 vector (node 1125:17102).
const pentagonClip =
  "path('M103.636 4.42615C111.788 -1.47539 122.807 -1.47538 130.959 4.42616L178.047 38.518L225.022 72.7672C233.154 78.696 236.559 89.1762 233.465 98.7523L215.593 154.071L197.536 209.33C194.41 218.896 185.495 225.373 175.432 225.39L117.297 225.487L59.163 225.39C49.0995 225.373 40.1845 218.896 37.0587 209.33L19.0018 154.071L1.12972 98.7523C-1.96406 89.1762 1.44115 78.696 9.57278 72.7672L56.5473 38.518L103.636 4.42615Z')";

export function ActivityArtwork({ src, alt, focalPoint = '50% 58%' }: ActivityArtworkProps) {
  return (
    <div className="relative h-61.5 w-full overflow-hidden rounded-2xl bg-[#d2e3dc]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 234.595,
          height: 225.487,
          clipPath: pentagonClip,
          WebkitClipPath: pentagonClip,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="235px"
          className="object-cover"
          style={{ objectPosition: focalPoint }}
        />
      </div>
    </div>
  );
}
