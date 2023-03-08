export async function loader({request}) {
  const response = await fetch(
    'https://hydrogen-preview.myshopify.com/pages/' + 'about',
    {
      headers: {
        // It's important to forward these headers. Otherwise, the online store might block the request.
        'X-Shopify-Client-IP': request.headers.get('X-Shopify-Client-IP'),
        'X-Shopify-Client-IP-Sig': request.headers.get(
          'X-Shopify-Client-IP-Sig',
        ),
        'User-Agent': 'Hydrogen',
      },
    },
  );
  const data = await response.text();
  return new Response(data, {
    headers: {'content-type': 'text/html'},
  });
}
