import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "WILL WE REALLY BE LOCKED IN A ROOM?",
    answer: "No, you won't actually be locked in. Safety is our top priority. All doors have emergency exits, and our game masters monitor the rooms at all times. You can leave whenever you need to."
  },
  {
    question: "WHAT DO WE DO IF WE GET STUCK AND CAN'T SOLVE A RIDDLE?",
    answer: "Don't worry! Our game masters are always watching and ready to provide hints when needed. You can request a hint at any time through our in-room communication system."
  },
  {
    question: "HOW SCARY IS YOUR QUEST?",
    answer: "Our rooms vary in intensity. Some have light thriller elements while others are purely puzzle-focused. We clearly label each room's scare level so you can choose what's comfortable for you."
  },
  {
    question: "IS THE QUEST SUITABLE FOR CHILDREN?",
    answer: "Yes! We have family-friendly rooms suitable for children aged 10 and up. Children under 14 must be accompanied by an adult. We recommend checking each room's difficulty rating."
  },
  {
    question: "HOW MANY PEOPLE CAN PARTICIPATE IN THE GAME?",
    answer: "Our rooms accommodate 2-6 players, depending on the specific quest. We recommend 3-5 players for the optimal experience. Larger groups can book multiple rooms for a team competition!"
  },
  {
    question: "DO YOU NEED SKILLS OR FITNESS?",
    answer: "No special skills or physical fitness required! Our puzzles rely on logic, observation, and teamwork. The rooms are accessible and don't require climbing or strenuous activity."
  },
  {
    question: "HOW ARE BOOKINGS AND PAYMENTS MADE?",
    answer: "Book online through our website or call us directly. We accept all major credit cards, cash, and digital payment methods. A small deposit is required to confirm your booking."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground">FAQ</h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card/50 hover:border-primary/30 transition-colors data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-display text-lg text-foreground hover:text-primary hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
