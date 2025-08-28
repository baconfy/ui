import {CheckCheck} from "lucide-react";

import {Section, SectionContent, SectionTitle} from "../components/section";
import {Alert, AlertDescription, AlertTitle, alertVariants} from "@/components/ui/alert";

export default function AlertPage() {
  const variants = ['default', 'success', 'primary', 'secondary', 'destructive', 'outline', 'ghost'];

  return (
    <>
      <Section>
        <SectionTitle>Default alert</SectionTitle>
        <SectionContent>
          <div className="w-full max-w-3xl mx-auto space-y-4">
            {variants.map((variant, i) => (
              <Alert variant={variant as keyof typeof alertVariants} key={`alert:${i}`}>
                <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)} title</AlertTitle>
                <AlertDescription>Pellentesque quis nulla semper, tincidunt orci et, rhoncus tortor.</AlertDescription>
              </Alert>
            ))}
          </div>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Default alert with icon</SectionTitle>
        <SectionContent>
          <div className="w-full max-w-3xl mx-auto space-y-4">
            {variants.map((variant, i) => (
              <Alert variant={variant as keyof typeof alertVariants} key={`alert:${i}`}>
                <CheckCheck/>
                <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)} title</AlertTitle>
                <AlertDescription>Pellentesque quis nulla semper, tincidunt orci et, rhoncus tortor.</AlertDescription>
              </Alert>
            ))}
          </div>
        </SectionContent>
      </Section>
    </>
  )
}