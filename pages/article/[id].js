import { useRouter } from "next/router"
import MainLayout from "../../components/MainLayout"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

export async function getServerSideProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default function Article(props) {
  let router = useRouter()
  const { t } = useTranslation()
  
  return (
  <MainLayout>
    {t('news', {returnObjects: true}).map((n) => (
      n.id === Number(router.query.id)
      ? (<div key={n.id} className='articleContainer'>
        <h2>{n.title}</h2>
        <Image
        src={n.image_big}
        alt={n.parent_category.category_title}
        width={800}
        height={541}
        />
        </div>)
      : null
    ))}
  </MainLayout>
  )
}

