import {useLoaderData} from '@remix-run/react';

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
  const liquidPage = new Response(data, {
    headers: {'content-type': 'text/html'},
  });
  return liquidPage;
}

export default function HybridPage() {
  const liquidPage = useLoaderData();
  return (
    <div>
      <div className="py-24 bg-red-300">
        <h1 className="text-center text-5xl font-bold">This is Hydrogen.</h1>
        <h2 className="text-center text-4xl font-medium">
          Below this is Online Store.
        </h2>
      </div>
      <div dangerouslySetInnerHTML={{__html: liquidPage}} />
      <div>
        <h1 className="text-center text-5xl font-bold py-24 bg-red-300">
          Oh, hey Hydrogen - it me again
        </h1>
      </div>
    </div>
  );
}
