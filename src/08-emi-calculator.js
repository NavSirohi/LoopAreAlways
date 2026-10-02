
export function calculateEMI(principal, monthlyRate, emi) {
  if(isNaN(monthlyRate) || isNaN(emi) || isNaN(principal)){
    return  { months: -1, totalPaid: -1, totalInterest: -1 }
  }
  // Your code here
  if(principal<=0 || monthlyRate<=0 || emi<=0){
    return { months: -1, totalPaid: -1, totalInterest: -1 }
  }
  if(emi<=principal*monthlyRate){
    return { months: -1, totalPaid: -1, totalInterest: -1 }
  }

    const originalPrincipal = principal;

  let totalIntertest=0;
let months=0;
let totalPaid=0;
  while(principal>0){
    
    const intrest=principal*monthlyRate;
    totalIntertest+=intrest;
    principal+=intrest;
    if(principal<emi){
      totalPaid+=principal;
      months++;
      break;
    }
    principal-=emi;
    months++;
    totalPaid+=emi;

  }

  return {
    months:months,
    totalPaid:totalPaid,
    totalInterest:Math.round((totalPaid - originalPrincipal) * 100) / 100

  }

}


/**
 
 * Rules (use while loop):
 *   - Start with principal amount (remaining balance)
 *   - Each month:
 *     1. Calculate interest = remaining * monthlyRate (monthlyRate is like 0.02 for 2%)
 *     2. Add interest to remaining: remaining = remaining + interest
 *     3. Deduct EMI: remaining = remaining - emi
 *     4. Increment months count
 *     5. Add emi to totalPaid
 *   - Continue while remaining > 0
 *   - In the last month, if remaining < emi, just pay what's left
 *     (totalPaid += remaining before deduction, not full emi)


//  *
//  * Infinite loop protection:
//  *   - Agar EMI <= first month's interest (principal * monthlyRate),
//  *     toh loan kabhi khatam nahi hoga!
//  *     Return: { months: -1, totalPaid: -1, totalInterest: -1 }
//  *
//  * Validation:
//  *   - All three params must be positive numbers, else return
//  *     { months: -1, totalPaid: -1, totalInterest: -1 }


 *
 * @param {number} principal - Loan amount (phone ki price)
 * @param {number} monthlyRate - Monthly interest rate (e.g., 0.02 for 2%)
 * @param {number} emi - Monthly EMI amount
 * @returns {{ months: number, totalPaid: number, totalInterest: number }}
 *
 * @example
 *   calculateEMI(10000, 0.01, 2000)
 *   // Month 1: 10000 + 100 = 10100, pay 2000, remaining = 8100
 *   // Month 2: 8100 + 81 = 8181, pay 2000, remaining = 6181
 *   // ... continues until remaining <= 0
 *
 *   calculateEMI(10000, 0.05, 400)
 *   // First month interest = 500, EMI = 400 < 500, INFINITE LOOP!
 *   // => { months: -1, totalPaid: -1, totalInterest: -1 }
 */