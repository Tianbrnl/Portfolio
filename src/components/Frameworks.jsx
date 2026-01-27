import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "canva",
    "css3",
    "html5",
    "javascript",
    "react",
    "tailwindcss",
    "figma",

  ];

  // Map skills to their file extensions
  const fileExtensions = {
    canva: "png",
    css3: "svg",
  
    html5: "svg",
    javascript: "svg",
    react: "svg",
    tailwindcss: "svg",
    figma: "png",
  };

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.${fileExtensions[skill] || "svg"}`} />
        ))}
      </OrbitingCircles>
     
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.${fileExtensions[skill] || "svg"}`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
