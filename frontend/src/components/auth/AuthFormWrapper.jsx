import Card from "../common/Card";

export default function AuthFormWrapper({
  children,
}) {
  return (
    <Card
      className="
        w-full
        max-w-[520px]
        rounded-[32px]
        p-8
        md:p-10
        xl:p-12
      "
    >
      {children}
    </Card>
  );
}