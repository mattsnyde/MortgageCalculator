**Mortgage Calculator Breakdown**
----------------------------------------------------------------------------------------
Summary of application: This is a simple mortgage calculator which caculates the monthly payment based on 6 factors.
    1) Home Price   2) Down payment     3) Loan Type (Yrs of loan)     4) Mortgage Interest rate        5) Property Taz $/Yr     6) Home Insurance $/Yr.

The mortgage is calculated by the formula: M = P[r(1+r)^n/((1+r)^n)-1)] which is only the principal and the interest, then I add on the Annual property tax /  12
as well as the annual home insurance / 12. 

Then I break down the combined monthly payment into 4 categories which are shown in the first page which is Principal Amount (Monthly), Property Tax (Monthly), Home Insurance (Monthly), and Interest Amount (Monthly).

Using Chart.js library I was able to construct a doughnut graph which represents a breakdown of the users monthly payment by %'s.

When the user clicks calculate it formats everything into dollar currency format. 

The second page contains a table of estimates we provide to the user. 
    The table contains, home price, home down paymwent, loan type, mortgage interest rate, annual property tax, annual home owner insurance, monthly interest, monthly home insurance, combined monthly payment, estimate #. 

    This table is updated by using localStorage, the localStorage is an empty array and then I take all of the variables listed on line 16, put them in an array and push it to the localStorage so I am nesting arrays.

    The data is filled within the table automatically using nested for loops to populate the cells with the data inside of localStorage. 

If the user wishes they can clear their localStorage using the clear table btn. 


*What I would change*
--------------------------------------
1. Table updates automatically without having to refresh the page
2. Make it more responsive overall
3. come up with a better theme/colors
