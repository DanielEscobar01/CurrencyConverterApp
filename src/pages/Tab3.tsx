import { IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { key, people } from 'ionicons/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ExpenseItem from '../components/ExpenseItem';
import ExploreContainer from '../components/ExploreContainer';
import { Expense } from '../models/expense.model';
import './Tab3.css';
import { logoutUser } from '../firebaseConfig'
import { useHistory } from 'react-router';
import { setUserState } from '../redux/actions';


// Api key = 4BAiPKtp5oYuhLB2NH9gmZ74ARBBngTs


const Tab3: React.FC = () => {

  const [Acumulado, setAcumulado] = useState(0);
  const [Amount, setAmount] = useState<number>();
  const [Currency, setCurrency] = useState<string>();
  const [Date, setDate] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [expense, setExpense] = useState<Expense[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(1);


  async function getCopValue() {
    const url = "https://api.apilayer.com/exchangerates_data/convert?to=COP&from=" + Currency + "&amount=" + Amount + "&apikey=4BAiPKtp5oYuhLB2NH9gmZ74ARBBngTs"
    var respuesta = await fetch(url)
    var response = await respuesta.json();
    console.log("Respuesta de Api " + response.result);
    setAcumulado(Acumulado+response.result);
    const formatedObject = { "Amount": Amount, "Currency": Currency, "Date": Date, "CopAmount": response.result };
    console.log(formatedObject);
    setExpense(expense => [...expense, formatedObject])
    setShowModal(false)
  }

  useIonViewDidEnter(async () => {
    const response = await fetch('https://openexchangerates.org/api/currencies.json');
    const data = await response.json();
    const currencyFormated = Object.keys(data);
    setCurrencies(currencies => [...currencyFormated]);
  })

  async function getTotal() {
    const totalValue = {

    }
    setTotal(prev => prev + total);
  }

  const username = useSelector((state: any) => state.user.username)
  const [busy, setBusy] = useState(false)
  const history = useHistory()
  
  async function logout() {
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonLoading message="Logging out..." duration={0} isOpen={busy}></IonLoading>
        <p>Hello {username}</p>
        <IonButton onClick={logout}>Logout</IonButton>
        <IonGrid>
          <IonRow>
            <IonCol>Amount</IonCol>
            <IonCol>Currency</IonCol>
            <IonCol>Date</IonCol>
            <IonCol>Amount in COP</IonCol>
          </IonRow>
          {expense.map((expense, idx) => <ExpenseItem key={idx} expense={expense} />)}
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
            <IonCol>Total = {Acumulado}</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>



      <IonButton onClick={() => setShowModal(true)} id="open-modal" expand="block">
        Add New Expense
      </IonButton>
      <IonButton onClick={() => getTotal()}>
        Get Total Amount
      </IonButton>
      <IonModal isOpen={showModal} >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Add New Expense</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => getCopValue()}>
                Add Expense
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Enter the expense amount</IonLabel>
            <IonInput required type="number" value={Amount} onIonChange={e => setAmount(Number(e.detail.value!))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Enter the expense currency</IonLabel>
            <IonSelect onIonChange={e => setCurrency(e.detail.value!)}>
              {currencies.map(currency => <IonSelectOption value={currency} key={currency} >{currency}</IonSelectOption>)}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Enter the expense date</IonLabel>
            <IonInput type="date" placeholder="Expense Date" onIonChange={e => setDate(e.detail.value!)} />
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};



export default Tab3;
