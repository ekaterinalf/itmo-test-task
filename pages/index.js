import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MainLayout from '../components/MainLayout'
import styles from '../styles/Home.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'


export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'title']))
    }
  }
}

export default function Home(props) {
  const { t } = useTranslation()
  let router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const handleOnLoad = () => {
    setIsLoading(false);
  };
  return (
    <MainLayout>
    <h3 className={styles.title}>{t('title:title')}</h3>
    <div className={styles.newsContainer}>
    {
      t('news', {returnObjects: true}).map((n, i) => (
        i < 9
        ? <div className={styles.card} style={isLoading ? {backgroundColor: 'lightgrey'} : null} key={n.id}>
          <Link href={`/article/${n.id}`}><a>
          <Image
            src={n.image_small}
            alt={n.parent_category.category_title}
            className={styles.cardImg}
            width={382}
            height={224}
            onLoad={handleOnLoad}
          />
          <div className={styles.cardBody} style={isLoading ? {display: 'none'} : null}>
            <p className={styles.date}>{`${new Date(n.date).getDate()} ${new Date(n.date).getMonth() === 5 ? router.locale === 'ru' ? 'июня' : 'june' : null} ${new Date(n.date).getFullYear()}`}</p>
            <p className='card-text'>{n.title}</p>
          </div>
          
          </a></Link>
          
        </div>
        : null
      ))
    }
    </div>
    </MainLayout>
  )
}
