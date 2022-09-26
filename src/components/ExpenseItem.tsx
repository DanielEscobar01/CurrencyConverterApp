import { IonCol, IonRow } from '@ionic/react'
import React from 'react'
import { Expense } from '../models/expense.model'
import '../pages/Tab3.css';

const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => {
    return (
        <IonRow className="rows">
            <IonCol>$ {expense.Amount}</IonCol>
            <IonCol>{expense.Currency}</IonCol>
            <IonCol>{expense.Date}</IonCol>
            <IonCol>$ {expense.CopAmount}</IonCol>
        </IonRow>
    )
}

export default ExpenseItem