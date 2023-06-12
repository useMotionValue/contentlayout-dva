import React from 'react'
import { clsxm } from '@lib/clsxm'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Pre from './pre'
import Callout from './callout'
import CodeTitle from './code-title'
import KommyImage from './kommy-image'

const components = {
  Callout,
  CodeTitle,
  KommyImage,
  a: ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className='animated-underline border-b border-dotted border-blue hover:border-blue/0'
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={clsxm(
        'text-xl leading-7 [&:not(:first-child)]:mt-6',
        className
      )}
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul className='my-6 ml-6 list-outside list-disc text-xl' {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className='my-6 ml-6 list-outside list-decimal text-xl' {...props} />
  ),
  li: ({ ...props }) => <li className='mt-2' {...props} />,
  blockquote: ({
    className,
    ...props
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className='mt-6 border-l-4 border-dark pl-6 italic text-dark [&>*]:text-zinc-600'
      {...props}
    />
  ),
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 min-w-full overflow-y-auto rounded-md'>
      <table className='min-w-full divide-y divide-gray-400' {...props} />
    </div>
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='m-0 p-0 even:bg-white' {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className='border border-gray-400 bg-white px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right'
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className='border border-gray-400 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right'
      {...props}
    />
  ),

  pre: Pre
}

interface IMDXComponents {
  code: string
}

export default function MDXComponents({ code }: IMDXComponents) {
  const MDXContentComponent = useMDXComponent(code)
  return <MDXContentComponent components={components} />
}
