import { Header, Footer, PageNotFound, MDXComponents } from '@components'
import { Post, allPosts } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import { Metadata } from 'next'
import { getMDXComponent } from 'next-contentlayer/hooks'

type Props = {
  params: { slug: string }
  searchparams: { [key: string]: string | string[] | undefined }
}

export const generateStaticParams = async () =>
  allPosts.map((post: Post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const post = allPosts.find(
    (post: Post) => post._raw.flattenedPath === params.slug
  )
  return { title: post?.title, description: post?.description }
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post: Post) => post._raw.flattenedPath === params.slug
  )

  let MDXContent

  if (!post) {
    return <PageNotFound />
  } else {
    MDXContent = getMDXComponent(post!.body.code)
  }

  return (
    <div className='max-w-[100vw] h-screen flex justify-center'>
      <div className='sm:w-[70%] w-full h-fit flex flex-col pb-32 '>
        <Header />
        <div className='xl:px-32 px-10 flex flex-col items-center'>
          <p className='text-slate-500 mb-4 mt-24'>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </p>
          <h1 className='text-slate-900 text-center md:text-5xl/snug text-4xl/snug font-bold'>
            {post.title}
          </h1>
          <article>
            <MDXContent components={{ ...MDXComponents }} />
          </article>
        </div>
      </div>
    </div>
  )
}

export default PostPage
