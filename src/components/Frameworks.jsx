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
    "node",
    "github",
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
    node: "png",
    github: "svg",
  };

  const getLogoSrc = (skill) =>
    `assets/logos/${skill}.${fileExtensions[skill] || "svg"}`;

  const reversedSkills = [...skills].reverse();

  return (
    <div className="relative flex h-[13rem] w-[13rem] items-center justify-center overflow-visible sm:h-[14rem] sm:w-[14rem]">
      <OrbitingCircles iconSize={35} radius={100}>
        {skills.map((skill) => (
          <Icon key={skill} src={getLogoSrc(skill)} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles iconSize={22} radius={54} reverse speed={2} startAngle={20}>
        {reversedSkills.map((skill) => (
          <Icon key={skill} src={getLogoSrc(skill)} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    draggable={false}
    className="h-full w-full rounded-sm object-contain p-1 duration-200"
  />
);
