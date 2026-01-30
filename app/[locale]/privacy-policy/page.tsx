import PrivacyPolicy from "@/_components/Pages/PrivacyPolicy";

export const runtime = "edge";

// export async function generateMetadata({
//     params: { locale },
// }: {
//     params: { locale: string };
// }): Promise<Metadata> {
//     return generatePageMetadata("pages/merchant", locale);
// }

export default async function Page() {

    return <PrivacyPolicy />;
}

