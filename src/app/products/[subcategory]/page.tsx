export default async function Page(props: {
    params: Promise<{
        subcategory: string;
    }>;
}){
    const {subcategory} = await props.params;
return <>{subcategory}</>
}