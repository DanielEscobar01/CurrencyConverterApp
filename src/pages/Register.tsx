import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import { toast } from '../toast';
import './Tab1.css';
import { registerUser } from '../firebaseConfig';
import { text } from 'ionicons/icons';

const Register: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    async function register() {
        setBusy(true)
        if (password !== cpassword) {
            return toast('Password dont match', 2000)
        }
        if (username.trim() === '' || password.trim() === '') {
            return toast('Username and password are required', 2000)
        }

        const res = await registerUser(username, password);
        if (res) {
            toast('You have registered successfully!', 2000)
        }
        setBusy(false)

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="registration in progress!..." duration={0} isOpen={busy} />
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
                <IonInput type="password"
                    placeholder="Confirm Password"
                    onIonChange={(e: any) => setCPassword(e.target.value)}>
                </IonInput>
                <div className='ion-text-center'><IonButton onClick={register}>Register</IonButton></div>
                <p>Already have an acount? <Link to="/tab1">Login</Link></p>
                <ExploreContainer name="Tab 1 page" />
            </IonContent>
        </IonPage>
    );
};

export default Register;
