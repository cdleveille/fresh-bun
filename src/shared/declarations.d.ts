declare module "*.svg?react" {
  const component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default component;
}
