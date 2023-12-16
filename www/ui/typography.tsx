import {cn} from '~/lib/utils'

type TypographyProps = {
  className?: string
  children: React.ReactNode
}

export function H1({className, children}: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function H2({className, children}: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  )
}
export function Lead({className, children}: TypographyProps) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  )
}

export function List({className, children}: TypographyProps) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
}

export function ListItem({className, children}: TypographyProps) {
  return <li className={className}>{children}</li>
}
