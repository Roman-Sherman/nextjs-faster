export default async function Page(props: {
  params: Promise<{
    product: string;
  }>;
}) {
  const { product } = await props.params;
  return <>{product}</>;
}
