import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { loginUser } from '../firebaseConfig';
import { toast } from '../toast';
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';

const Tab1: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    setBusy(true)
    const res:any = await loginUser(username, password)
    if (res) {
      dispatch(setUserState(res.user.email))
      history.replace('/tab3')
      toast('You have logged in!', 2000)
    }
    setBusy(false)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput placeholder="Username" onIonChange={(e: any) => setUsername(e.target.value)}></IonInput>
        <IonInput type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}>
        </IonInput>
        <div id='boton'>
        <IonButton onClick={login}>Login</IonButton>
        </div>
        <p>Are you new here? <Link to="/register">Register</Link></p>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
