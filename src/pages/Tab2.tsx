import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useState } from 'react';
import { Expense } from '../models/expense.model';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [expense, setExpense] = useState<Expense[]>([]);
  console.log(expense.values);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Total</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
            <IonCol>Total</IonCol>
        </IonRow>
      </IonGrid>
      {expense.map(expense => {
        return (
          <IonItem key={expense.Amount}>
            <IonLabel>{expense.CopAmount}</IonLabel>
          </IonItem>
        )
      })}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
