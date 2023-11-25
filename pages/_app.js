import '../styles/globals.scss'
import Layout from '../components/layout'
import AdminLayout from 'components/Admin/admin-layout'

function MyApp({ Component, pageProps, router  }) {
  const getLayout =
        router.pathname.includes('/admin') ? ((page) => <AdminLayout>
            {page}
        </AdminLayout>)
        : ((page) => <Layout>
            {page}
        </Layout>);

    return (
        <>
            {getLayout(<Component {...pageProps} />, pageProps)}
        </>
    );
}

export default MyApp
