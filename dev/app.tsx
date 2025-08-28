import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {ComponentProps} from "react";
import {cn} from "../src/lib/utils";
import {SaveIcon} from "lucide-react";

export default function App() {
  const variants = ['default', 'primary', 'secondary', 'destructive', 'ghost', 'link'];

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col justify-around grow bg-muted max-w-96 p-8">
          <a>Buttons</a>
        </div>

        <div className="flex flex-col grow p-8">
          <div className="space-y-8 py-12">

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

          </div>
        </div>
      </div>
    </>
  )
}

const Section = ({children, ...props}: ComponentProps<'section'>) => (
  <section className={cn('space-y-2', props.className)} {...props}>{children}</section>
)

const SectionTitle = ({children, ...props}: ComponentProps<'h1'>) => (
  <h1 className={cn('text-2xl font-bold', props.className)} {...props}>{children}</h1>
)

const SectionContent = ({children, ...props}: ComponentProps<'div'>) => (
  <div className={cn('flex border bg-muted text-muted-foreground border-border/25 item-center justify-center rounded p-16 gap-4', props.className)} {...props}>
    {children}
  </div>
)