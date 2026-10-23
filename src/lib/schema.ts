import { site, type OpeningDay } from '@/data/site';
import { services } from '@/data/services';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Un bloque OpeningHoursSpecification por cada horario distinto. */
export function openingHoursSpecification(hours: readonly OpeningDay[] = site.hours) {
  const groups = new Map<string, { opens: string; closes: string; days: string[] }>();
  for (const h of hours) {
    if (!h.opens || !h.closes) continue;
    const key = `${h.opens}-${h.closes}`;
    const group = groups.get(key) ?? { opens: h.opens, closes: h.closes, days: [] };
    group.days.push(dayNames[h.day]);
    groups.set(key, group);
  }
  return [...groups.values()].map((g) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }));
}

/** JSON-LD para SEO local (BarberShop). */
export function barberShopSchema(siteUrl: URL, imageUrl: string) {
  const prices = services.map((s) => s.price);

  return {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    '@id': new URL('/#barbershop', siteUrl).toString(),
    name: site.name,
    description: site.description,
    url: siteUrl.toString(),
    image: imageUrl,
    priceRange: `S/${Math.min(...prices)}–S/${Math.max(...prices)}`,
    currenciesAccepted: 'PEN',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    hasMap: site.mapsUrl,
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: openingHoursSpecification(),
    amenityFeature: site.parking
      ? [{ '@type': 'LocationFeatureSpecification', name: 'Estacionamiento', value: true }]
      : undefined,
    sameAs: [site.instagram.url],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.bookingUrl,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
      result: { '@type': 'Reservation', name: 'Reserva de cita' },
    },
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      price: s.price,
      priceCurrency: 'PEN',
      itemOffered: { '@type': 'Service', name: s.name },
    })),
  };
}
