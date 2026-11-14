---
layout: post
title:  "MySQL Window Functions - Complete Guide"
date:   2026-11-14 08:23:45
categories: sql
description: MySQL Window Functions - Complete Guide
keywords: [Andrei Pall, oracle, sql, database, tutorial, blog, project]
excerpt: MySQL Window Functions are extremely useful for SQL developers, data analysts, and backend developers. They allow you to perform calculations across multiple rows while keeping each individual row in the result set.
---
MySQL Window Functions are extremely useful for SQL developers, data analysts, and backend developers. They allow you to perform calculations across multiple rows while **keeping each individual row in the result set**.

They are commonly used for:

- Finding the highest-paid employees in each department.
- Ranking products, employees, or customers.
- Calculating running totals and cumulative sums.
- Comparing current and previous records.
- Finding the difference between consecutive transactions.
- Calculating moving averages.
- Finding the first, last, or Nth value in a group.
- Calculating percentages and distributions.

MySQL supports window functions starting with **MySQL 8.0**. The examples below use MySQL 8.x syntax.

Let's understand them step by step.

## **1. What is a window function?**

First, understand the difference between `GROUP BY` and a window function.

Suppose we have an `employees` table:

**employees**

| emp_id | emp_name | department | salary |
| ------ | -------- | ---------- | ------ |
| 1      | John     | IT         | 5000   |
| 2      | Alice    | IT         | 7000   |
| 3      | Bob      | IT         | 6000   |
| 4      | David    | HR         | 4000   |
| 5      | Emma     | HR         | 5000   |
| 6      | Mike     | HR         | 6000   |

### **Example A: Using GROUP BY**

```
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

Result:

| department | avg_salary |
| ---------- | ---------- |
| IT         | 6000       |
| HR         | 5000       |

Notice that the individual employee records disappear. You get one row per department.

### **Example B: Using a window function**

```
SELECT
    emp_id,
    emp_name,
    department,
    salary,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS avg_salary
FROM employees;
```

Result:

| emp_name | department | salary | avg_salary |
| -------- | ---------- | ------ | ---------- |
| John     | IT         | 5000   | 6000       |
| Alice    | IT         | 7000   | 6000       |
| Bob      | IT         | 6000   | 6000       |
| David    | HR         | 4000   | 5000       |
| Emma     | HR         | 5000   | 5000       |
| Mike     | HR         | 6000   | 5000       |

**The important difference:** A window function calculates values across related rows without combining those rows into one result.

## **2. Understanding the OVER() clause**

The `OVER()` clause is the most important concept in window functions.

General syntax:

```
FUNCTION_NAME(expression)
OVER (
    PARTITION BY column_name
    ORDER BY column_name
    ROWS BETWEEN ...
)
```

There are three important components.

### **A. PARTITION BY**

Divides rows into separate groups.

```
SELECT
    emp_name,
    department,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
    ) AS department_total
FROM employees;
```

Explanation:

- IT employees form one partition.
- HR employees form another partition.
- The salary total is calculated independently for each department.
- All employee records remain in the output.

If you omit `PARTITION BY`, MySQL considers all rows as one partition.

### **B. ORDER BY**

Determines the order in which rows are processed inside each partition.

```
SELECT
    emp_name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS row_num
FROM employees;
```

Employees are numbered by salary, from highest to lowest, within each department.

### **C. ROWS BETWEEN**

Defines which rows are included in the calculation for the current row.

For example:

```
SUM(salary) OVER (
    ORDER BY emp_id
    ROWS BETWEEN UNBOUNDED PRECEDING
             AND CURRENT ROW
)
```

This calculates a running total from the first row up to the current row.

We will explore frames in more detail later.

# **3. All MySQL Window Functions**

MySQL provides 11 dedicated non-aggregate window functions.

They can be divided into four categories:

| Category     | Functions                          |
| ------------ | ---------------------------------- |
| Ranking      | ROW_NUMBER, RANK, DENSE_RANK       |
| Distribution | PERCENT_RANK, CUME_DIST, NTILE     |
| Navigation   | LAG, LEAD                          |
| Value        | FIRST_VALUE, LAST_VALUE, NTH_VALUE |

Additionally, several aggregate functions can be used as window functions.

Let's understand each one.

## **Category 1: Ranking Functions**

### **1. ROW_NUMBER()**

**Purpose:** Assigns a unique sequential number to every row within a partition.

Syntax:

```
ROW_NUMBER() OVER (
    PARTITION BY column_name
    ORDER BY column_name
)
```

Example:

```
SELECT
    emp_name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS row_num
FROM employees;
```

Expected result:

| emp_name | department | salary | row_num |
| -------- | ---------- | ------ | ------- |
| Alice    | IT         | 7000   | 1       |
| Bob      | IT         | 6000   | 2       |
| John     | IT         | 5000   | 3       |
| Mike     | HR         | 6000   | 1       |
| Emma     | HR         | 5000   | 2       |
| David    | HR         | 4000   | 3       |

**How does it work?**

1. `PARTITION BY department` divides employees into departments.
2. `ORDER BY salary DESC` sorts employees by salary.
3. `ROW_NUMBER()` assigns a unique number starting from 1 in each department.

Even if two employees have the same salary, they receive different row numbers.

**Real-world use cases:**

- Finding the latest transaction for each customer.
- Removing duplicate records.
- Finding the first employee in each department.
- Selecting the top N records in each group.

Example: Find the highest-paid employee in each department.

```
SELECT *
FROM (
    SELECT
        emp_name,
        department,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC, emp_id
        ) AS rn
    FROM employees
) AS ranked
WHERE rn = 1;
```

This is one of the most frequently used window-function patterns.

### **2. RANK()**

**Purpose:** Assigns ranking numbers based on the specified ordering.

If two or more rows have the same value, they receive the same rank. The next rank contains a gap.

Example data:

| emp_name | salary |
| -------- | ------ |
| John     | 7000   |
| Alice    | 7000   |
| Bob      | 6000   |
| David    | 5000   |
| Emma     | 5000   |

Query:

```
SELECT
    emp_name,
    salary,
    RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Result:

| emp_name | salary | salary_rank |
| -------- | ------ | ----------- |
| John     | 7000   | 1           |
| Alice    | 7000   | 1           |
| Bob      | 6000   | 3           |
| David    | 5000   | 4           |
| Emma     | 5000   | 4           |

**Why does Bob get rank 3 instead of 2?**

Because John and Alice both occupy rank 1.

The next available rank is 3.

Ranking sequence:

`1, 1, 3, 4, 4`

**Real-world use cases:**

- Employee salary rankings.
- Competition leaderboards.
- Product popularity rankings.
- Student examination rankings.

### **3. DENSE_RANK()**

**Purpose:** Similar to `RANK()`, but it does not skip ranking numbers.

Query:

```
SELECT
    emp_name,
    salary,
    DENSE_RANK() OVER (
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Result:

| emp_name | salary | dense_rank |
| -------- | ------ | ---------- |
| John     | 7000   | 1          |
| Alice    | 7000   | 1          |
| Bob      | 6000   | 2          |
| David    | 5000   | 3          |
| Emma     | 5000   | 3          |

Compare the three ranking functions:

| Salary | ROW_NUMBER | RANK | DENSE_RANK |
| ------ | ---------- | ---- | ---------- |
| 7000   | 1          | 1    | 1          |
| 7000   | 2          | 1    | 1          |
| 6000   | 3          | 3    | 2          |
| 5000   | 4          | 4    | 3          |
| 5000   | 5          | 4    | 3          |

Important interview concept

Remember:

- `ROW_NUMBER()` → Always generates unique sequential numbers.
- `RANK()` → Same rank for ties, skips subsequent numbers.
- `DENSE_RANK()` → Same rank for ties, does not skip numbers.

## **Category 2: Distribution Functions**

These functions help you understand the relative position of a row within a dataset.

### **4. PERCENT_RANK()**

**Purpose:** Calculates the relative rank of a row as a percentage between 0 and 1.

Syntax:

```
PERCENT_RANK() OVER (
    PARTITION BY column_name
    ORDER BY column_name
)
```

Formula:

\\[ PERCENT\\\_RANK = \frac{RANK - 1}{TotalRows - 1} \\]

Example:

```
SELECT
    emp_name,
    salary,
    PERCENT_RANK() OVER (
        ORDER BY salary
    ) AS percentage_rank
FROM employees;
```

For five rows with distinct salaries:

| Salary | RANK | PERCENT_RANK |
| ------ | ---- | ------------ |
| 4000   | 1    | 0            |
| 5000   | 2    | 0.25         |
| 6000   | 3    | 0.50         |
| 7000   | 4    | 0.75         |
| 8000   | 5    | 1            |

**How to interpret it:**

- `0` means the first ranked position.
- `0.25` means 25%.
- `0.50` means 50%.
- `1` means the highest ranked position.

Note that ties use the same rank, so percentages can also be repeated.

**Real-world use cases:**

- Finding an employee's relative salary position.
- Analyzing student performance.
- Understanding customer spending distribution.
- Comparing product performance.

### **5. CUME_DIST()**

**Purpose:** Calculates the cumulative distribution of a row.

It returns the proportion of rows whose ordering value is less than or equal to the current row's value.

Formula:

\\[ CUME\\\_DIST = \frac{\text{Number of rows up to current peer group}}{\text{Total rows}} \\]

Example:

```
SELECT
    emp_name,
    salary,
    CUME_DIST() OVER (
        ORDER BY salary
    ) AS cumulative_distribution
FROM employees;
```

Assume these salaries:

| Employee | Salary |
| -------- | ------ |
| John     | 4000   |
| Alice    | 5000   |
| Bob      | 5000   |
| David    | 6000   |
| Emma     | 8000   |

Result:

| Employee | Salary | CUME_DIST |
| -------- | ------ | --------- |
| John     | 4000   | 0.20      |
| Alice    | 5000   | 0.60      |
| Bob      | 5000   | 0.60      |
| David    | 6000   | 0.80      |
| Emma     | 8000   | 1.00      |

Why does Alice get `0.60`?

There are three rows with salary less than or equal to 5000.

Total rows = 5.

Therefore:

\\[ 3/5 = 0.60 \\]

**Difference between PERCENT_RANK() and CUME_DIST():**

| PERCENT_RANK                  | CUME_DIST                       |
| ----------------------------- | ------------------------------- |
| Uses rank minus 1             | Uses cumulative row count       |
| Formula: (rank - 1) / (N - 1) | Formula: cumulative count / N   |
| First ranking position is 0   | First row can be greater than 0 |
| Maximum is 1                  | Maximum is 1                    |

### **6. NTILE(N)**

**Purpose:** Divides rows into a specified number of approximately equal-sized groups (buckets).

Syntax:

```
NTILE(number_of_groups) OVER (
    ORDER BY column_name
)
```

Example:

```
SELECT
    emp_name,
    salary,
    NTILE(4) OVER (
        ORDER BY salary DESC
    ) AS salary_group
FROM employees;
```

Suppose there are 12 employees.

The result divides them into four groups:

| Salary position     | Bucket |
| ------------------- | ------ |
| Highest 3 employees | 1      |
| Next 3 employees    | 2      |
| Next 3 employees    | 3      |
| Lowest 3 employees  | 4      |

**Real-world use cases:**

- Dividing customers into four spending groups.
- Segmenting employees by salary.
- Dividing students into performance groups.
- Creating quartiles or deciles for analytics.

For example, `NTILE(10)` divides records into ten groups, often used for decile analysis.

Important: When the number of rows cannot be divided equally, some buckets receive one extra row.

## **Category 3: Navigation Functions**

Navigation functions allow you to access values from other rows without joining the same table to itself.

These are particularly useful for comparing current and previous records.

### **7. LAG()**

Very important

**Purpose:** Retrieves a value from a previous row.

Syntax:

```
LAG(expression, offset, default_value)
OVER (
    PARTITION BY column_name
    ORDER BY column_name
)
```

Parameters:

- `expression`: Column whose value you want.
- `offset`: How many rows backward to look.
- `default_value`: Value to return if the previous row does not exist.

Example: Consider a monthly sales table.

**monthly_sales**

| month    | sales |
| -------- | ----- |
| January  | 1000  |
| February | 1500  |
| March    | 1200  |
| April    | 2000  |
| May      | 2500  |

Query:

```
SELECT
    month,
    sales,
    LAG(sales) OVER (
        ORDER BY month_id
    ) AS previous_month_sales
FROM monthly_sales;
```

Result:

| Month    | Sales | Previous sales |
| -------- | ----- | -------------- |
| January  | 1000  | NULL           |
| February | 1500  | 1000           |
| March    | 1200  | 1500           |
| April    | 2000  | 1200           |
| May      | 2500  | 2000           |

Notice that `LAG()` retrieves the value from the previous row.

**Example 2: Calculate month-over-month sales difference**

```
SELECT
    month,
    sales,
    LAG(sales) OVER (
        ORDER BY month_id
    ) AS previous_sales,
    sales - LAG(sales) OVER (
        ORDER BY month_id
    ) AS sales_difference
FROM monthly_sales;
```

Result:

| Month    | Sales | Previous sales | Difference |
| -------- | ----- | -------------- | ---------- |
| January  | 1000  | NULL           | NULL       |
| February | 1500  | 1000           | 500        |
| March    | 1200  | 1500           | -300       |
| April    | 2000  | 1200           | 800        |
| May      | 2500  | 2000           | 500        |

**Example 3: Calculate percentage growth**

```
SELECT
    month,
    sales,
    LAG(sales) OVER (
        ORDER BY month_id
    ) AS previous_sales,
    ROUND(
        (
            sales - LAG(sales) OVER (
                ORDER BY month_id
            )
        ) * 100.0 /
        NULLIF(
            LAG(sales) OVER (
                ORDER BY month_id
            ), 0
        ),
        2
    ) AS growth_percentage
FROM monthly_sales;
```

This is useful for:

- Month-over-month comparisons.
- Year-over-year comparisons.
- Tracking changes in account balances.
- Detecting changes in customer activity.
- Comparing consecutive transactions.

### **8. LEAD()**

**Purpose:** Retrieves a value from a future row.

It is the opposite of `LAG()`.

Syntax:

```
LEAD(expression, offset, default_value)
OVER (
    PARTITION BY column_name
    ORDER BY column_name
)
```

Example:

```
SELECT
    month,
    sales,
    LEAD(sales) OVER (
        ORDER BY month_id
    ) AS next_month_sales
FROM monthly_sales;
```

Result:

| Month    | Sales | Next month sales |
| -------- | ----- | ---------------- |
| January  | 1000  | 1500             |
| February | 1500  | 1200             |
| March    | 1200  | 2000             |
| April    | 2000  | 2500             |
| May      | 2500  | NULL             |

**Difference between LAG and LEAD:**

| LAG()                             | LEAD()                        |
| --------------------------------- | ----------------------------- |
| Looks backward                    | Looks forward                 |
| Gets previous row's value         | Gets next row's value         |
| Useful for historical comparisons | Useful for future comparisons |

Example: Compare the current transaction with the next transaction.

```
SELECT
    transaction_id,
    transaction_date,
    amount,
    LEAD(amount, 1, 0) OVER (
        ORDER BY transaction_date, transaction_id
    ) AS next_transaction_amount
FROM transactions;
```

## **Category 4: Value Functions**

These functions retrieve specific values from a window frame.

### **9. FIRST_VALUE()**

**Purpose:** Returns the value from the first row of the current window frame.

Syntax:

```
FIRST_VALUE(expression) OVER (
    PARTITION BY column_name
    ORDER BY column_name
)
```

Example: Find the highest salary in each department.

```
SELECT
    emp_name,
    department,
    salary,
    FIRST_VALUE(emp_name) OVER (
        PARTITION BY department
        ORDER BY salary DESC, emp_id
    ) AS highest_paid_employee
FROM employees;
```

Result:

| Employee | Department | Salary | Highest paid employee |
| -------- | ---------- | ------ | --------------------- |
| Alice    | IT         | 7000   | Alice                 |
| Bob      | IT         | 6000   | Alice                 |
| John     | IT         | 5000   | Alice                 |
| Mike     | HR         | 6000   | Mike                  |
| Emma     | HR         | 5000   | Mike                  |
| David    | HR         | 4000   | Mike                  |

**How does it work?**

1. Divides employees by department.
2. Sorts salaries in descending order.
3. Retrieves the first employee name in each department's window frame.

Use cases:

- Finding the highest-paid employee.
- Finding the earliest transaction.
- Identifying the first event in a customer journey.
- Finding the first recorded status.

### **10. LAST_VALUE()**

**Purpose:** Returns the value from the last row of the current window frame.

Example:

```
SELECT
    emp_name,
    department,
    salary,
    LAST_VALUE(emp_name) OVER (
        PARTITION BY department
        ORDER BY salary
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND UNBOUNDED FOLLOWING
    ) AS highest_salary_employee
FROM employees;
```

Here we explicitly define the frame to include the entire department.

Why is the frame important?

A common mistake is writing:

```
LAST_VALUE(emp_name) OVER (
    PARTITION BY department
    ORDER BY salary
)
```

This does not necessarily return the last employee in the entire department. With an ordered window, MySQL's default frame ends at the current row's peer group.

To get the last value from the entire partition, use:

```
ROWS BETWEEN UNBOUNDED PRECEDING
         AND UNBOUNDED FOLLOWING
```

**Common use cases:**

- Finding the latest transaction.
- Getting the final status of an order.
- Retrieving the last event in a process.
- Identifying the highest or lowest ordered value.

### **11. NTH_VALUE()**

**Purpose:** Retrieves the value from the Nth row of the current window frame.

Syntax:

```
NTH_VALUE(expression, N) OVER (
    PARTITION BY column_name
    ORDER BY column_name
    ROWS BETWEEN ...
)
```

Example: Find the second-highest salary in each department.

```
SELECT
    emp_name,
    department,
    salary,
    NTH_VALUE(emp_name, 2) OVER (
        PARTITION BY department
        ORDER BY salary DESC, emp_id
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND UNBOUNDED FOLLOWING
    ) AS second_highest_employee
FROM employees;
```

The result identifies the employee in the second position in each department.

Important: `NTH_VALUE()` retrieves the Nth row, not the Nth distinct salary.

If two employees share the highest salary, the second row might still have that same salary.

Use cases:

- Finding the second transaction.
- Finding the third-highest record.
- Retrieving the Nth event.
- Analyzing ordered business events.

# **4. Aggregate Functions Used as Window Functions**

One important thing to understand is that MySQL also allows normal aggregate functions to work as window functions by adding `OVER()`.

These are not additional dedicated window functions, but they are extremely important.

The main aggregate functions are:

| Function           | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `SUM()`            | Calculates the sum                            |
| `AVG()`            | Calculates the average                        |
| `COUNT()`          | Counts rows                                   |
| `MIN()`            | Finds the minimum value                       |
| `MAX()`            | Finds the maximum value                       |
| `BIT_AND()`        | Bitwise AND aggregation                       |
| `BIT_OR()`         | Bitwise OR aggregation                        |
| `BIT_XOR()`        | Bitwise XOR aggregation                       |
| `STDDEV_POP()`     | Population standard deviation                 |
| `STDDEV_SAMP()`    | Sample standard deviation                     |
| `VAR_POP()`        | Population variance                           |
| `VAR_SAMP()`       | Sample variance                               |
| `JSON_ARRAYAGG()`  | Aggregates values into a JSON array           |
| `JSON_OBJECTAGG()` | Aggregates key-value pairs into a JSON object |

Let's understand the most commonly used ones.

### **12. SUM() OVER()**

**Purpose:** Calculates the sum across a window without removing individual rows.

Example: Calculate the total salary of each department.

```
SELECT
    emp_name,
    department,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
    ) AS department_total_salary
FROM employees;
```

Example: Calculate running total salary.

```
SELECT
    emp_name,
    salary,
    SUM(salary) OVER (
        ORDER BY emp_id
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND CURRENT ROW
    ) AS running_total
FROM employees;
```

If the salaries are 5000, 7000, 6000, the running totals will be:

| Employee | Salary | Running total |
| -------- | ------ | ------------- |
| John     | 5000   | 5000          |
| Alice    | 7000   | 12000         |
| Bob      | 6000   | 18000         |

### **13. AVG() OVER()**

**Purpose:** Calculates the average across a window.

Example: Calculate department-wise average salary.

```
SELECT
    emp_name,
    department,
    salary,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS department_avg_salary
FROM employees;
```

Example: Calculate a moving average of the last three records.

```
SELECT
    month_id,
    month,
    sales,
    AVG(sales) OVER (
        ORDER BY month_id
        ROWS BETWEEN 2 PRECEDING
                 AND CURRENT ROW
    ) AS moving_average
FROM monthly_sales;
```

This calculates the average of:

- Current month.
- Previous month.
- Two months before the current month.

This is particularly useful for financial reporting and sales trend analysis.

### **14. COUNT() OVER()**

**Purpose:** Counts records in a window.

Example: Count employees in each department.

```
SELECT
    emp_name,
    department,
    COUNT(*) OVER (
        PARTITION BY department
    ) AS department_employee_count
FROM employees;
```

Example: Calculate cumulative employee count.

```
SELECT
    emp_id,
    emp_name,
    COUNT(*) OVER (
        ORDER BY emp_id
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND CURRENT ROW
    ) AS cumulative_count
FROM employees;
```

### **15. MIN() OVER()**

**Purpose:** Finds the minimum value within a window.

```
SELECT
    emp_name,
    department,
    salary,
    MIN(salary) OVER (
        PARTITION BY department
    ) AS minimum_department_salary
FROM employees;
```

Every employee receives the minimum salary of their department.

### **16. MAX() OVER()**

**Purpose:** Finds the maximum value within a window.

```
SELECT
    emp_name,
    department,
    salary,
    MAX(salary) OVER (
        PARTITION BY department
    ) AS maximum_department_salary
FROM employees;
```

Every employee receives the maximum salary of their department.

# **5. Window Frame Specification – ROWS and RANGE**

This is one of the most important advanced concepts in MySQL window functions.

A window frame determines which rows participate in a calculation for the current row.

Consider:

```
SUM(salary) OVER (
    ORDER BY emp_id
    ROWS BETWEEN 2 PRECEDING
             AND CURRENT ROW
)
```

This means:

- Include two preceding rows.
- Include the current row.
- Calculate the sum.

There are several frame boundaries.

| Frame boundary        | Meaning                   |
| --------------------- | ------------------------- |
| `UNBOUNDED PRECEDING` | Start from the first row  |
| `N PRECEDING`         | N rows before current row |
| `CURRENT ROW`         | Current row               |
| `N FOLLOWING`         | N rows after current row  |
| `UNBOUNDED FOLLOWING` | Last row                  |

### **Common frame examples**

**Example 1: Running total**

```
SUM(salary) OVER (
    ORDER BY emp_id
    ROWS BETWEEN UNBOUNDED PRECEDING
             AND CURRENT ROW
)
```

Calculates the sum from the first row to the current row.

**Example 2: Moving average of three rows**

```
AVG(salary) OVER (
    ORDER BY emp_id
    ROWS BETWEEN 2 PRECEDING
             AND CURRENT ROW
)
```

Calculates the average of the current row and two preceding rows.

**Example 3: Next two rows**

```
SUM(salary) OVER (
    ORDER BY emp_id
    ROWS BETWEEN CURRENT ROW
             AND 2 FOLLOWING
)
```

Calculates the sum of the current row and the next two rows.

**Example 4: Entire dataset**

```
SUM(salary) OVER (
    ROWS BETWEEN UNBOUNDED PRECEDING
             AND UNBOUNDED FOLLOWING
)
```

Calculates the total salary across all rows.

### **Difference between ROWS and RANGE**

This is a common interview question.

- `ROWS` works with physical row positions.
- `RANGE` works with ordering values and peer groups.

Suppose the data is:

| Employee | Salary |
| -------- | ------ |
| John     | 5000   |
| Alice    | 5000   |
| Bob      | 6000   |
| David    | 7000   |

Using `ROWS`:

```
SUM(salary) OVER (
    ORDER BY salary
    ROWS BETWEEN UNBOUNDED PRECEDING
             AND CURRENT ROW
)
```

The calculation advances one physical row at a time.

Using `RANGE`:

```
SUM(salary) OVER (
    ORDER BY salary
    RANGE BETWEEN UNBOUNDED PRECEDING
              AND CURRENT ROW
)
```

Rows with the same ordering value are peers. Therefore, both employees earning 5000 receive the same cumulative total.

| Employee | Salary | ROWS total | RANGE total |
| -------- | ------ | ---------- | ----------- |
| John     | 5000   | 5000\*     | 10000       |
| Alice    | 5000   | 10000\*    | 10000       |
| Bob      | 6000   | 16000      | 16000       |
| David    | 7000   | 23000      | 23000       |

\*The order between John and Alice is not guaranteed unless you add a tie-breaking column to ORDER BY. The illustrated ROWS totals assume John comes first.

**When should you use each?**

| ROWS                                    | RANGE                                  |
| --------------------------------------- | -------------------------------------- |
| Physical row-based calculations         | Value/peer-based calculations          |
| Running totals by record                | Cumulative calculations including ties |
| Moving averages over the last N records | Calculations based on ordering values  |

# **6. Named Windows – WINDOW Clause**

When you need to use the same window definition multiple times, you can create a named window.

Without a named window:

```
SELECT
    emp_name,
    department,
    salary,

    RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank,

    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS dense_salary_rank,

    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS row_num

FROM employees;
```

With a named window:

```
SELECT
    emp_name,
    department,
    salary,

    RANK() OVER w AS salary_rank,

    DENSE_RANK() OVER w AS dense_salary_rank,

    ROW_NUMBER() OVER w AS row_num

FROM employees

WINDOW w AS (
    PARTITION BY department
    ORDER BY salary DESC
);
```

Both queries produce equivalent results.

**Advantages:**

- Avoids repeating the same window definition.
- Makes queries easier to read.
- Easier to maintain.
- Useful when several window functions use the same partition and ordering.

# **7. Real-World SQL Problems Using Window Functions**

Now let's look at some practical problems that frequently appear in SQL interviews and real projects.

### **Problem 1: Find the second-highest salary in each department**

```
SELECT *
FROM (
    SELECT
        emp_name,
        department,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
) AS ranked
WHERE salary_rank = 2;
```

Why `DENSE_RANK()`?

Because we want the second-highest **distinct salary**, even when multiple employees have the same salary.

### **Problem 2: Find the top three employees in each department**

```
SELECT *
FROM (
    SELECT
        emp_name,
        department,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC, emp_id
        ) AS rn
    FROM employees
) AS ranked
WHERE rn <= 3;
```

This returns a maximum of three employees per department.

If you want to include everyone tied at the third rank, use `RANK()` instead.

### **Problem 3: Find duplicate records**

Suppose you have a customer table with duplicate email addresses.

```
SELECT *
FROM (
    SELECT
        customer_id,
        customer_name,
        email,
        ROW_NUMBER() OVER (
            PARTITION BY email
            ORDER BY customer_id
        ) AS rn
    FROM customers
) AS duplicates
WHERE rn > 1;
```

Explanation:

- `PARTITION BY email` groups customers with the same email.
- `ROW_NUMBER()` assigns numbers within each group.
- `rn = 1` identifies the first record.
- `rn > 1` identifies the additional records.

You can use this result to identify duplicates before deciding which records to retain.

### **Problem 4: Find the latest transaction for every customer**

```
SELECT *
FROM (
    SELECT
        transaction_id,
        customer_id,
        transaction_date,
        amount,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY transaction_date DESC,
                     transaction_id DESC
        ) AS rn
    FROM transactions
) AS latest_transactions
WHERE rn = 1;
```

This is a very common business requirement.

### **Problem 5: Calculate cumulative sales for each customer**

```
SELECT
    customer_id,
    transaction_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY transaction_date, transaction_id
        ROWS BETWEEN UNBOUNDED PRECEDING
                 AND CURRENT ROW
    ) AS cumulative_sales
FROM transactions;
```

This calculates the running sales total separately for every customer.

### **Problem 6: Compare current salary with department average**

```
SELECT
    emp_name,
    department,
    salary,
    AVG(salary) OVER (
        PARTITION BY department
    ) AS avg_salary,
    salary - AVG(salary) OVER (
        PARTITION BY department
    ) AS salary_difference
FROM employees;
```

This helps identify employees earning above or below their department average.

### **Problem 7: Find employees earning more than their department average**

```
SELECT *
FROM (
    SELECT
        emp_name,
        department,
        salary,
        AVG(salary) OVER (
            PARTITION BY department
        ) AS avg_salary
    FROM employees
) AS employee_salary
WHERE salary > avg_salary;
```

### **Problem 8: Calculate the difference between consecutive transactions**

```
SELECT
    customer_id,
    transaction_date,
    amount,
    amount - LAG(amount) OVER (
        PARTITION BY customer_id
        ORDER BY transaction_date, transaction_id
    ) AS amount_difference
FROM transactions;
```

This compares each customer's transaction amount with their previous transaction.

# **8. Important Differences and Interview Questions**

Here are the concepts you should remember.

| Question                                 | Answer                                 |
| ---------------------------------------- | -------------------------------------- |
| Does a window function eliminate rows?   | No                                     |
| Does GROUP BY eliminate individual rows? | Yes, it groups rows                    |
| What is the purpose of OVER()?           | Defines the window                     |
| What is PARTITION BY?                    | Divides rows into groups               |
| What is ORDER BY inside OVER()?          | Defines the processing order           |
| What does ROW_NUMBER() do?               | Assigns unique sequential numbers      |
| What does RANK() do?                     | Assigns ranks with gaps                |
| What does DENSE_RANK() do?               | Assigns ranks without gaps             |
| What does LAG() do?                      | Retrieves a previous row's value       |
| What does LEAD() do?                     | Retrieves a following row's value      |
| What does NTILE(4) do?                   | Divides rows into four buckets         |
| What does FIRST_VALUE() do?              | Retrieves the first value in the frame |
| What does LAST_VALUE() do?               | Retrieves the last value in the frame  |
| What does NTH_VALUE() do?                | Retrieves the Nth value in the frame   |

## **9. Important MySQL Window Function Rules**

These are important when writing actual SQL queries.

**1. Window functions require MySQL 8.0 or later.**

**2. Window functions can be used in the SELECT list and ORDER BY clause.**

You cannot directly use a window function in the WHERE clause.

Incorrect:

```
SELECT *
FROM employees
WHERE ROW_NUMBER() OVER (
    ORDER BY salary DESC
) = 1;
```

Correct:

```
SELECT *
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER (
            ORDER BY salary DESC
        ) AS rn
    FROM employees
) AS result
WHERE rn = 1;
```

**3. Use a deterministic ORDER BY when necessary.**

If multiple rows have the same value, add a unique column as a tie-breaker when you need consistent results.

**4. Be careful with LAST_VALUE().**

Use an explicit frame when you need the last value from the entire partition:

```
ROWS BETWEEN UNBOUNDED PRECEDING
         AND UNBOUNDED FOLLOWING
```

**5. LAG() and LEAD() have useful defaults.**

```
LAG(salary, 1, 0)
```

This returns 0 when there is no preceding row.

**6. Window functions are evaluated after WHERE, GROUP BY and HAVING, but before the final ORDER BY and LIMIT.**

This explains why you generally need a subquery or CTE to filter their results.

Sources: Official MySQL 8.4 documentation:

- [Window Function Descriptions](https://dev.mysql.com/doc/refman/8.4/en/window-function-descriptions.html?utm_source=chatgpt.com)
- [Window Function Concepts and Syntax](https://dev.mysql.com/doc/refman/8.4/en/window-functions-usage.html?utm_source=chatgpt.com)
- [Named Windows](https://dev.mysql.com/doc/refman/8.4/en/window-functions-named-windows.html?utm_source=chatgpt.com)
- [Aggregate Functions](https://dev.mysql.com/doc/refman/8.4/en/aggregate-functions.html?utm_source=chatgpt.com)

# **10. Recommended Learning Order**

If you are learning MySQL window functions for interviews or practical development, I recommend this order:

## **MySQL Window Functions Learning Roadmap**

1. **Fundamentals**

   `OVER()`, `PARTITION BY`, `ORDER BY`

   Start here
2. **Ranking functions**

   `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`
3. **Navigation functions**

   `LAG()`, `LEAD()`
4. **Aggregate window functions**

   `SUM()`, `AVG()`, `COUNT()`, `MIN()`, `MAX()`
5. **Window frames**

   `ROWS`, `RANGE`, `PRECEDING`, `FOLLOWING`
6. **Advanced functions**

   `NTILE()`, `PERCENT_RANK()`, `CUME_DIST()`, `FIRST_VALUE()`, `LAST_VALUE()`, `NTH_VALUE()`
7. **Real-world SQL problems**

   Top N per group, duplicates, running totals, latest records and salary comparisons.

