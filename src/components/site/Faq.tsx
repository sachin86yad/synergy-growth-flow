import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/config/site";

export function Faq() {
  return (
    <Accordion type="single" collapsible className="mt-8 divide-y divide-border border-y border-border">
      {FAQS.map((faq, index) => (
        <AccordionItem key={faq.q} value={`faq-${index}`} className="border-none">
          <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="measure pb-5 text-sm text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}