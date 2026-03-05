type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-primary-700 md:text-4xl">
        {title}
      </h1>
      {description ? <p className="mt-3 text-pretty text-primary-600/85">{description}</p> : null}
    </div>
  );
}

