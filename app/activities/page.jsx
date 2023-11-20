import Styles from './activitiesPage.module.css';
import Menu from '../components/menu/Menu';
import Activitie from '../components/activities/Activities';
import AllActivities from '../components/activities/allactivitie/AllActivities';


const Page = ({searchParams}) => {

  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  console.log('the page component----------------------------------');

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>ACTIVITIES</h1>
      <div class="grid grid-cols-1 gap-4">
        <AllActivities page={page} cat={cat} />
      </div>
    </div>
  )
}

export default Page
