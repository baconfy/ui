import {Button} from '@/components/ui/button'
import {SaveIcon} from "lucide-react";
import {Section, SectionContent, SectionTitle} from "../components/section";
import {buttonVariants} from "../../src/components/ui/button";

export default function ButtonPage() {
  const variants = ['default', 'primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'];

  return (
    <>
      <Section>
        <SectionTitle>Default buttons</SectionTitle>
        <SectionContent>
          {variants.map((variant, i) => (
            <Button key={`button:${i}`} variant={variant as keyof typeof buttonVariants}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Default buttons with icon</SectionTitle>
        <SectionContent>
          {variants.map((variant, i) => (
            <Button key={`button-icon:${i}`} variant={variant as keyof typeof buttonVariants}>
              <SaveIcon/> {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Small buttons</SectionTitle>
        <SectionContent>
          {variants.map((variant, i) => (
            <Button key={`button-small:${i}`} variant={variant as keyof typeof buttonVariants} size="small">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Small buttons with icon</SectionTitle>
        <SectionContent>
          {variants.map((variant, i) => (
            <Button key={`button-small:${i}`} variant={variant as keyof typeof buttonVariants} size="small">
              <SaveIcon/> {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </SectionContent>
      </Section>
    </>
  )
}