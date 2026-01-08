import { motion } from "framer-motion";
import Masonry from "@/components/ui/masonry";

// Placeholder images - update paths later
const galleryItems = [
  { id: 1, img: "/app1.png", height: 400 },
  { id: 2, img: "/app2.png", height: 320 },
  { id: 3, img: "/app3.png", height: 480 },
  { id: 4, img: "/app4.png", height: 360 },
  { id: 5, img: "/app5.png", height: 420 },
  { id: 6, img: "/app6.png", height: 340 },
  { id: 7, img: "/app7.png", height: 400 },
  { id: 8, img: "/app8.png", height: 360 },
  { id: 9, img: "/app9.png", height: 440 },
  { id: 10, img: "/app10.png", height: 380 },
  { id: 11, img: "/app11.png", height: 420 },
  { id: 12, img: "/app12.png", height: 360 },
  { id: 13, img: "/app13.png", height: 400 },
  { id: 14, img: "/app14.png", height: 320 },
  { id: 15, img: "/app15.png", height: 380 },
];

export default function AppGallery() {
  return (
    <section id="showcase" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-600/10 blur-[100px] sm:blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-600/10 blur-[100px] sm:blur-[150px] -z-10 rounded-full" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Masonry Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <Masonry 
            items={galleryItems}
            animateFrom="bottom"
            stagger={0.03}
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
          
          {/* Bottom gradient fade for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
