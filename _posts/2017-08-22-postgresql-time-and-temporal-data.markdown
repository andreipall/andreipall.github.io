---
layout: post
title:  "PostgreSQL Time and Temporal Data"
date:   2017-08-22 12:46:56
categories: SQL
description: PostgreSQL Time and Temporal Data
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: PostgreSQL is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. PostgreSQL runs on all major operating systems, including Linux, UNIX and Windows.
---

PostgreSQL is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. PostgreSQL runs on all major operating systems, including Linux, UNIX and Windows. 

{% highlight sql %}
-- Date construction 
select date '2015-10-21';
select '2015-10-21'::date;
select '2015-21-10'::date;
select date 'Oct 21, 2015';
select date '2015/10/21';
select date '151021';
select date 'Oct 21, 2015 BC';
select date 'J10';
select date 'infinity';
select date '-infinity';
select date 'epoch';

-- Time construction
select time '12:34:56.789';
select '12:34:56.789'::time;
select time '34:56.789';
select time '12:34';
select time (1) '12:34:00.199';
select time '010203';
select time '3:14pm';
select time 'allballs';
select time '0:0';

-- Timestamp construction
select timestamp '2015-10-21 12:34:56.789';
select timestamp '2015-10-21';
select timestamp '-infinity';
select timestamp 'epoch';
select timestamp 'now';

-- Interval construction
select interval '1 year 2 months 3 days';
select interval '1 year 2 months 3 days ago';
select interval '1 12:34';
select interval '1-1 12:34';
select interval '12:34';
select interval 'P1Y2M3DT4H5M6.789S';
select interval 'P1Y2M3M4M5M10Y';
select interval 'P0001-02-03T04:05:06';
select date '2017-02-01' + interval '1 month';
select date '2017-03-01' + interval '1 month';
select interval '1 day' - interval '300 hours';
select interval '1-2 4:5:6.789' year to month;
select interval '1-2 4:5:6.789' day to minute;
create table vehicle_rentals (is_late_by interval hour);
select interval '1-2 4:5:6.789' day to second (1);

-- Date operators
select date '1985-10-21' + 5;
select date '1985-10-26' - 5;
select date '1985-10-21' + interval '30 years';
select date '2015-10-21' - interval '30 years';
select date '2015-10-21' + time '01:00';
select date '2015-10-26' - date '2015-10-21';
select date '2015-10-26' = date '2015-10-21';
select date '2015-10-26' < date '2015-10-21';

-- Date functions
select make_date(2015, 10, 21);
select date_part('year', date '2016-10-21');
select extract('month' from date '2016-10-21');
select date_part('dow', date '2015-10-21');
select date_part('epoch', date '2015-10-21');
select isfinite(date '-infinity');
select to_char(date '2015-10-21', 'Mon-YY');
select to_char(date '2015-10-21', 'Month YYYY BC, day DD');
select to_char(date '2015-10-21', 'Month YYYY BC, "day" DD');
select to_char(date '2015-10-21', 'FMMonth YYYY BC, "day" DD');
select to_char(date '2015-10-21', 'FMMonth YYYY BC, DDth "day"');
select to_char(date '2015-10-21', 'FMMonth YYYY BC, DDth "day" (DAY of "w"eek WW)');
select to_date('21st October 2015 BC', 'DDth Month YYYY BC');
select to_date('2015-20-40', 'YYYY-MM-DD');

-- Time operators
select time '01:00' + interval '4 hours';
select time '15:30' - time '12:00';
select time '15:30' + interval '1 year';
select time '3:00' = time '3:01';
select time '3:00' < time '3:01';

-- Time functions
select make_time(1, 2, 3.456);
select date_part('hour', time '1:2:3.456789');
select date_part('minute', time '1:2:3.456789');
select date_part('second', time '1:2:3.456789');
select date_part('millisecond', time '1:2:3.456789');
select date_part('microsecond', time '1:2:3.456789');
select date_trunc('hour', time '01:02:56.123789');
select date_trunc('millisecond', time '01:02:56.123789');
select to_char(time '15:02:03.456', 'HH.MI AM (SSSS"s" "since midnight")');

-- Timestamp operators
select timestamp '2015-10-21 01:00' + interval '2 days 4 hours';
select timestamp '2015-10-21 01:00' - time '03:30';
select timestamp '2015-10-26 01:00' - timestamp '2015-10-21 03:00';
select timestamp '2015-10-26 01:00' = timestamp '2015-10-21 03:00';
select timestamp '2015-10-26 01:00' < timestamp '2015-10-21 03:00';

-- Timestamp functions
select make_timestamp(2015, 10, 21, 1, 2, 3.4);
select to_timestamp(1490732210.566);
select age('1980-01-01 00:00:00');
select age('2015-10-26 0:0:0', '2015-10-21 2:0:0');
select age('2015-11-22', '2015-10-21');
select date_trunc('year', timestamp '2015-10-21 01:02:03');
select date_trunc('hour', timestamp '2015-10-21 01:02:03');
select date_trunc('month', date '2015-10-21')::date;
select (date_trunc('month', date '2015-10-21') + interval '1 month -1 day')::date;
select to_char(timestamp '2015-10-21 01:02:03', 'Mon-YY HH24:MI');
select to_timestamp('21st October 2015 BC 12:30', 'DDth Month YYYY BC HH24:MI');
select to_timestamp('2015-20-40', 'YYYY-MM-DD');

-- Date and timestamp gotchas
select age(date '2017-02-28', date '2016-02-28');
select date '2017-02-28' - date '2016-02-28';

-- Interval operators
select interval '1 month' + interval '1 hour';
select interval '1 year' - interval '5 months';
select interval '1 year' + interval '4000 days';
select -interval '1 hour';
select 10 * interval '1 hour';
select 0.3 * interval '1 year';
select interval '1 year' / 3.5;
select interval '1 year' = interval '360 days';

-- Interval functions
select make_interval(1, 2, 0, 3, 4, 5, 6.789);
select make_interval(days => 20, months => 2); 
select justify_hours('1 day 49 hours');
select justify_days('35 days');
select justify_interval('35 days 49 hours');
select to_char(interval '15:02:03.456', 'HH.MI AM (SSSS"s" "since midnight")');
{% endhighlight %}
{% highlight sql %}
-- Range construction
select numrange '[1, 10)';
select numrange(1, 10);
select numrange(1, 10, '[]');
select numrange '[1,)';
select numrange '(,10)';
select numrange '(,)';
select numrange 'empty';

-- Date range construction
select daterange '[today, infinity)';
select daterange '[today,)';
select daterange '[today, 2030-01-01)';
select daterange('yesterday', 'tomorrow', '[]');

-- Range functions
select lower(daterange '[today, 2030-01-01)');
select upper(daterange '[today, 2030-01-01)');
select lower_inc(daterange '[today, 2030-01-01)');
select upper_inc(daterange '[today, 2030-01-01)');
select lower_inf(daterange '[today, 2030-01-01)');
select upper_inf(daterange '[today, 2030-01-01)');
select isempty(daterange '[today, 2030-01-01)');
select range_merge(daterange '[2015-10-21, 2015-10-22)', daterange '[2015-10-25, 2015-10-26)');

-- Range operators
select daterange '[2015-10-21, 2015-10-30)' = daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-30)' != daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-30)' && daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-26)' @> date '2015-10-22';
select date '2015-10-22' <@ daterange '[2015-10-21, 2015-10-26)';
select daterange '[2015-10-21, 2015-10-26)' @> daterange '[2015-10-22, 2015-10-24)';
select daterange '[2015-10-22, 2015-10-24)' <@ daterange '[2015-10-21, 2015-10-26)';
select daterange '[2015-10-21, 2015-10-25)' << daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-26, 2015-11-30)' >> daterange '[2015-10-21, 2015-10-25)';
select daterange '[2015-10-21, 2015-10-25)' &< daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-25)' &> daterange '[2015-10-26, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-25)' -|- daterange '[2015-10-25, 2015-10-26)';
select daterange '[2015-10-25, 2015-10-26)' -|- daterange '[2015-10-21, 2015-10-25)';
select daterange '[2015-10-21, 2015-10-23)' + daterange '[2015-10-25, 2015-10-26)';
select daterange '[2015-10-21, 2015-10-23)' * daterange '[2015-10-22, 2015-10-26)';
select daterange '[2015-10-21, 2015-10-31)' - daterange '[2015-10-25, 2015-11-30)';
select daterange '[2015-10-21, 2015-10-31)' - daterange '[2015-10-22, 2015-10-25)';

-- Timestamp range construction
select tsrange '[2015-10-21 00:00:00, 2015-10-26 15:30:45)';
select tsrange '[2015-10-21 00:00:00, 2015-10-26 15:30:45]';

-- Time range construction
create type timerange as range (subtype = time);
select timerange '[03:00, 03:30)' * timerange '[03:20, 04:00)';

-- Overlaps operator
select (date '2015-10-21', date '2015-10-30') overlaps (date '2015-10-26', date '2015-11-30');
select (date '2015-10-21', interval '9 days') overlaps (date '2015-10-26', interval '1 month');

-- Current time 
select date 'today';
select date 'yesterday';
select date 'tomorrow';
select timestamp 'yesterday';
select time 'now';
select timestamp 'now';

begin;
select now();
select now(); 
select now(); 
rollback;

begin;
select clock_timestamp();
select clock_timestamp(); 
select clock_timestamp(); 
rollback;

select statement_timestamp(), pg_sleep(1), statement_timestamp();
select clock_timestamp(), pg_sleep(1), clock_timestamp();

create table aeons (num int, created_at timestamp default 'now', updated_at timestamp default now());
insert into aeons(num) values (1);
insert into aeons(num) values (2);
insert into aeons(num) values (3);

-- Sequence generation
select * from generate_series(timestamp '2015-10-21', timestamp '2015-10-26', interval '2 hours');
select s.d::date from generate_series(timestamp '2015-10-21', timestamp '2015-10-26', interval '1 day') as s(d);

select date '2015-10-21' + s.i 
from generate_series(0, 5, 1) as s(i);

select id, created_at::date, start_at, finish_at 
from vehicle_usage 
where id = 'LP8574' 
order by created_at;

select d::date as created_on 
from generate_series(date '2017-03-01', date '2017-03-10', interval '1 day') s(d);

with dates as (
    select d::date as created_on 
    from generate_series(date '2017-03-01', date '2017-03-10', interval '1 day') s(d)
)
select id, created_on, start_at, finish_at
from dates
left join vehicle_usage on created_on = created_at::date
where id = 'LP8574' or id is null
order by created_on;

with dates as (
    select d::date as created_on 
    from generate_series(date '2017-03-01', date '2017-03-10', interval '1 day') s(d)
)
select id, created_on, start_at, finish_at
from dates
left join vehicle_usage on created_on = created_at::date and id = 'LP8574'
order by created_on;

with dates as (
    select d::date as created_on 
    from generate_series(date '2017-03-01', date '2017-03-10', interval '1 day') s(d)
    where date_part('isodow', d) < 6
)
select id, created_on, start_at, finish_at
from dates
left join vehicle_usage on created_on = created_at::date and id = 'LP8574'
order by created_on;
{% endhighlight %}
{% highlight sql %}
-- Time zone aware types

select timestamptz '2015-10-21 01:00:00+5:30';
select timestamptz '2015-10-21 01:00:00+1:23:45';
select timestamptz '2015-10-21 01:00:00 America/Los_Angeles';

-- Time zone views

select * from pg_timezone_names;
select * from pg_timezone_abbrevs;

-- Calculations

select make_timestamptz(2015, 10, 21, 1, 2, 3.4);
select make_timestamptz(2015, 10, 21, 1, 2, 3.4, 'NZ');

-- Set time zone

set time zone 'NZ';
set time zone 'US/Pacific';

-- Time zone conversions

set time zone 'NZ';
select timestamp '2015-10-21 10:00:00' at time zone 'PRC';
select timezone('PRC', timestamp '2015-10-21 10:00:00');
select timestamptz '2015-10-21 10:00:00+8' at time zone 'NZ';
select timestamptz '2015-10-21 10:00:00+8' at time zone interval '5:30';

-- Gotchas

set time zone 'US/Eastern';
select age(timestamptz '2017-07-01 12:00:00', timestamptz '2017-03-01 12:00:00'); -- 4 months
select timestamptz '2017-07-01 12:00:00' - timestamptz '2017-03-01 12:00:00'; -- not 4 months

select * from pg_timezone_names where name = 'CET'; -- entry exists
select * from pg_timezone_abbrevs where abbrev = 'CET'; -- also exists
set time zone 'UTC';
select timestamptz '2017-04-10 0:0:0 CET'; -- uses abbreviation, not time zone
{% endhighlight %}
{% highlight sql %}
-- Using timestamps to record when changes were made to a row
create table loads (
    machine_id bigint not null references machines(machine_id),
    volume double precision not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    deleted_at timestamptz 
);

-- Partial index on non-deleted rows
create index loads_created_at_index 
on loads (created_at) 
where deleted_at is null;

-- Example constraints on user defined time columns
alter table people 
add check (birth_date <@ daterange((date 'today' - interval '150 years')::date, 'today', '[]'));

alter table people 
add check (activation_date = date_trunc('month', activation_date));

-- Table with a transaction time period
create table zones (
    zone_id bigserial not null, 
    name varchar not null,
    trans_period tstzrange not null default tstzrange(now(), 'infinity')
);

create extension btree_gist;
alter table zones 
add exclude using gist (zone_id with =, trans_period with &&);

alter table zones add check(
    (lower(trans_period) < now() and upper(trans_period) = now()) 
    or 
    (lower(trans_period) = now() and upper(trans_period) = 'infinity')
) not valid;


-- Testing the exclusion constraint
insert into zones (zone_id, project_id, trans_period)
values (3, 1, tstzrange(now(), 'infinity'));  [a]

insert into zones (zone_id, trans_period)
values (3, 1, tstzrange(now(), 'infinity'));  -- This will fail

-- Testing transaction time constraint
insert into zones (project_id, trans_period) 
values (3, tstzrange(now() - interval '1 hour', now() + interval '1 minute'));  -- This will fail

insert into zones (project_id, trans_period) 
values (3, tstzrange(now() + interval '1 hour', 'infinity'));  -- This will fail

-- Updating a row with transaction time
begin;
update zones set trans_period = tstzrange(lower(trans_period), now()) where zone_id = $1 and upper(trans_period) = 'infinity';

insert into zones (zone_id, name) 
values ($1, $2); 
commit;

-- Adding a current foreign key constraint
create or replace function 
    check_project_is_current() 
returns trigger as
$$
begin
if (select exists (
    select 1 from projects 
    where project_id = new.project_id 
        and upper(trans_period) = 'infinity'
)) then 
    return null;
else
    raise exception 'project % is not current', new.project_id;
end if;
end;
$$
language plpgsql;

create constraint trigger zones_check_project_id 
after insert or update
on zones
from projects
deferrable initially deferred
for each row
execute procedure check_project_is_current();

-- Testing a current foreign key constraint
insert into zones (zone_id, project_id, trans_period) 
values (3, 2, tstzrange(now(), 'infinity'));  -- This will fail if project 3 is non-current

-- Adding a sequenced foreign key constraint
create or replace function 
    check_project_is_sequenced() 
returns trigger as
$$
begin
if (select not exists (
    select 1 from projects 
    where project_id = new.project_id 
        and trans_period @> lower(new.trans_period)
)) then 
    raise exception 'project % doesn''t overlap with %', new.project_id, lower(new.trans_period);

elseif (select not exists (
    select 1 from projects 
    where project_id = new.project_id 
        and (trans_period @> upper(new.trans_period) or upper(trans_period) = upper(new.trans_period))
)) then
    raise exception 'project % doesn''t overlap with %', new.project_id, upper(new.trans_period);

elseif (select exists (
    with subsequent_periods as (
        select trans_period, lead(trans_period, 1) over (order by lower(trans_period)) as next_trans_period
        from projects
        where project_id = new.project_id 
            and trans_period && new.trans_period 
    )
    select 1 
    from subsequent_periods
    where not trans_period -|- next_trans_period
)) then 
    raise exception 'project % has gaps between %', new.project_id, new.trans_period;
else
    return null;
end if;
end;
$$
language plpgsql;

create constraint trigger zones_check_project_id 
after insert or update
on zones
from projects
deferrable initially deferred
for each row
execute procedure check_project_is_sequenced();

-- Adding a current and sequenced uniqueness constraint for valid time
create extension btree_gist;
alter table machine_assignments 
add exclude using gist (machine_id with =, valid_period with &&);

-- Ensuring a gapless sequence of valid periods
create or replace function 
    check_assignments_contiguous() 
returns trigger as
$$
begin
if (select exists (
    with subsequent_periods as (
        select valid_period, lead(valid_period, 1) over (order by lower(valid_period)) as next_valid_period
        from machine_assignments
        where machine_id = new.machine_id 
    )
    select 1 
    from subsequent_periods
    where not valid_period -|- next_valid_period
)) then 
    raise exception 'machine % has gaps in valid_period', new.machine_id;
else
    return null;
end if;
end;
$$
language plpgsql;

create constraint trigger machine_assignments_check_valid_period
after insert or update or delete
on machine_assignments
deferrable initially deferred
for each row
execute procedure check_assignments_contiguous();

-- SQL:2011 temporal features examples
create table vehicles (
    vehicle_id bigserial,
    project_id bigint,
    valid_from date,
    valid_to date,
    period for valid_period(valid_from, valid_to)
);

update vehicles 
    for portion of valid_period
        from date '2015-10-21'
        to date '2015-10-26'
set project_id = 17
where vehicle_id = 5367;
{% endhighlight %}
{% highlight sql %}
-- Aggregation
select min(created_at) 
from loads 
where vehicle_id = $1 
    and created_at >= date_trunc('month', now());
    
with rows as (values (interval '1 years'), (interval '360 days'), (interval '24 hours 1 minute')) 
select sum(column1) from rows;

select date_trunc('week', created_at) as week, count(*) 
from loads
group by 1 
order by 1 desc;

-- Independence from current time
select * 
from machine_costs
where lower(valid_period) <= coalesce($1, now());

-- Window functions
with gap_records as (
    select upper(valid_period) as period_end, lead(lower(valid_period), 1) over (partition by machine_id order by valid_period) as next_period_start, machine_id
    from machine_assignments  
)
select machine_id, sum(next_period_start - period_end) as idle_time
from gap_records
group by machine_id;

-- Coalescing ranges (range aggregation)

create table ranges (r daterange);

insert into ranges (r) values 
    (daterange('2015-01-10', '2015-01-12')),
    (daterange('2015-01-10', '2015-01-12')),
    (daterange('2015-01-01', '2015-01-05')),
    (daterange('2015-01-01', '2015-01-03')),
    (daterange('2015-01-03', '2015-01-06')),
    (daterange('2015-01-07', '2015-01-09')),
    (daterange('2015-01-08', '2015-01-09')),
    (daterange('2015-01-12', 'infinity'));
    
with a as (
    select r from ranges order by r
) 
, b as (
    select r, 
      case when max(upper(r)) over (rows between unbounded preceding and 1 preceding) >= lower(r) then null 
      else lower(r) end as low
    from a
)
, c as (
    select r, max(low) over (order by r) as low
    from b
)
select daterange(low, max(upper(r))) 
from c
group by low 
order by 1;    

-- Finding gaps between overlapping ranges
with a as (
    select r from ranges order by r
)
, b as (
    select r, 
      case when max(upper(r)) over (rows between unbounded preceding and 1 preceding) >= lower(r) then null 
      else lower(r) end as low
    from a
)
, c as (
    select daterange(lag(upper(r), 1) over (order by r), low) as gap
    from b
)
select gap
from c
where not lower_inf(gap) and not upper_inf(gap);

-- Time slice queries
select name, valid_period 
from machines 
join machine_assignments using (machine_id) 
where now() <@ valid_period 
order by name;

select machines.name, valid_period, zones.name, zones.geometry 
from machines 
join machine_assignments on machines.machine_id = machine_assignments.machine_id 
    and now() <@ machine_assignments.valid_period 
join zones on machine_assignments.zone_id = zones.zone_id and now() <@ zones.trans_period
order by machines.name;

-- Sequenced queries - selection
select * 
from machine assignments
where machine_id = 1;

-- Sequenced queries - projection
select zone_id, valid_period 
from machine_assignments
where machine_id = 1;

-- Sequenced queries - sorting
select * 
from machine_assignments 
order by zone_id, machine_id, valid_period;

select * 
from machine_assignments 
where now() <@ valid_period
order by zone_id, machine_id, valid_period;

-- Sequenced queries - joins
select ma.machine_id, cost_per_day, 
    tstzrange(greatest(lower(ma.valid_period), lower(mc.valid_period)), 
        least(upper(ma.valid_period), upper(mc.valid_period)))
from machine_assignments ma
join machine_costs mc using (machine_id)
where greatest(lower(ma.valid_period), lower(mc.valid_period)) < 
    least(upper(ma.valid_period), upper(mc.valid_period));
    
-- Sequenced queries - difference
select ma.machine_id, tstzrange(lower(ma.valid_period), lower(mr.valid_period)) as valid_period
from machine_assignments ma
join machine_repairs mr using (machine_id)
where zone_id = $1
    and lower(ma.valid_period) < lower(mr.valid_period)  -- exclude invalid ranges
    and int8range(lower(ma.valid_period), lower(mr.valid_period)) <@ ma.valid_period  -- exclude impossible ranges
    and not exists (
        select 1 
        from machine_repairs mr2
        where mr2.machine_id = ma.machine_id 
            and lower(ma.valid_period) < upper(mr2.valid_period) 
            and lower(mr2.valid_period) < lower(mr.valid_period)
    )

union

select ma.machine_id, tstzrange(upper(mr.valid_period), upper(ma.valid_period)) as valid_period
from machine_assignments ma
join machine_repairs mr using (machine_id)
where zone_id = $1
    and upper(mr.valid_period) < upper(ma.valid_period)  
    and int8range(upper(mr.valid_period), upper(ma.valid_period)) <@ ma.valid_period  
    and not exists (
        select 1 
        from machine_repairs mr2
        where mr2.machine_id = ma.machine_id 
            and upper(mr.valid_period) < upper(mr2.valid_period) 
            and lower(mr2.valid_period) < upper(ma.valid_period)
    )

union

select ma.machine_id, tstzrange(upper(mr.valid_period), lower(mr2.valid_period)) as valid_period
from machine_assignments ma
join machine_repairs mr using (machine_id)
join machine_repairs mr2 using (machine_id)
where zone_id = $1
    and upper(mr.valid_period) < lower(mr2.valid_period)  
    and int8range(upper(mr.valid_period), lower(mr2.valid_period)) <@ ma.valid_period  
    and not exists (
        select 1 
        from machine_repairs mr3
        where mr3.machine_id = ma.machine_id 
            and upper(mr.valid_period) < upper(mr3.valid_period) 
            and lower(mr3.valid_period) < lower(mr2.valid_period)
    )

union

select ma.machine_id, valid_period
from machine_assignments ma
where zone_id = $1
    and not exists (
        select 1 
        from machine_repairs mr
        where mr.machine_id = ma.machine_id 
            and lower(ma.valid_period) < upper(mr.valid_period) 
            and lower(mr.valid_period) < upper(ma.valid_period)
    )

order by machine_id, valid_period;    

-- Sequenced queries - union
select * 
from machine_assignments
where zone_id = 1
union all
select * 
from machine_assignments
where zone_id = 2;

-- Current modifications - insert
insert into machine_assignments (machine_id, project_id, valid_period) 
values (100, 1, tstzrange(now(), 'infinity'));

-- Current modifications - delete
begin;
update machine_assignments 
set valid_period = tstzrange(lower(valid_period), now()) 
where now() <@ valid_period and project_id = 1;

delete from machine_assignments 
where now() < lower(valid_period) and project_id = 1;
commit;

-- Current modifications - update, no future rows
begin;
update machine_assignments
set valid_period = tstzrange(lower(valid_period), now())
where upper(valid_period) = 'infinity' and machine_id = 100 ;

insert into machine_assignments (machine_id, project_id, valid_period) 
values (100, 2, tstzrange(now(), 'infinity'));
commit;

-- Current modifications - update, general case
begin;
insert into machine_assignments (machine_id, project_id, valid_period) 
select machine_id, 2 as project_id, tstzrange(now(), upper(valid_period))
from machine_assignments 
where now() <@ valid_period and machine_id = 100;

update machine_assignments
set valid_period = tstzrange(lower(valid_period), now())
where lower(valid_period) < now() and upper(valid_period) > now() and machine_id = 100;

update machine_assignments 
set project_id = 2 
where now() < lower(valid_period) and machine_id = 100;
commit;

-- Sequenced modifications - deletion
begin;
insert into machine_assignments (machine_id, project_id, valid_period) 
select machine_id, project_id, tstzrange('2017-03-01 0:0:0', upper(valid_period))
from machine_assignments 
where lower(valid_period) < timestamptz '2017-03-01 0:0:0' and upper(valid_period) > timestamptz '2017-03-31 0:0:0' and machine_id = 100;

update machine_assignments
set valid_period = tstzrange(lower(valid_period), '2017-03-01 0:0:0')
where lower(valid_period) < '2017-03-01 0:0:0' and upper(valid_period) >= '2017-03-01 0:0:0' and machine_id = 100;

update machine_assignments
set valid_period = tstzrange('2017-04-01 0:0:0', upper(valid_period))
where lower(valid_period) < '2017-04-01 0:0:0' and upper(valid_period) >= '2017-04-01 0:0:0' and machine_id = 100;

delete from machine_assignments 
where lower(valid_period) >= timestamptz '2017-03-01 0:0:0' and upper(valid_period) <= timestamp '2017-04-01 0:0:0' and machine_id = 100;
commit;

-- Sequenced modifications - update
begin;
insert into machine_assignments (machine_id, project_id, valid_period)
select machine_id, project_id, tstzrange(lower(valid_period), timestamptz '2017-03-01 0:0:0')
from machine_assignments 
where lower(valid_period) < timestamptz '2017-03-01 0:0:0' and upper(valid_period) > timestamptz '2017-03-01 0:0:0'
and machine_id = 100;

insert into machine_assignments (machine_id, project_id, valid_period)
select machine_id, project_id, tstzrange(timestamptz '2017-04-01 0:0:0', upper(valid_period))
from machine_assignments 
where lower(valid_period) < timestamptz '2017-04-01 0:0:0' and upper(valid_period) > timestamptz '2017-04-01 0:0:0' and machine_id = 100;

update machine_assignments 
set project_id = 2
where lower(valid_period) < timestamptz '2017-04-01 0:0:0' and upper(valid_period) > timestamptz '2017-03-01 0:0:0' and machine_id = 100;

update machine_assignments
set valid_period = tstzrange('2017-03-01 0:0:0', upper(valid_period))
where lower(valid_period) < timestamptz '2017-03-01 0:0:0' and upper(valid_period) > timestamptz '2017-03-01 0:0:0' and machine_id = 100;

update machine_assignments
set valid_period = tstzrange(lower(valid_period), '2017-04-01 0:0:0')
where lower(valid_period) < timestamptz '2017-04-01 0:0:0' and upper(valid_period) > timestamptz '2017-04-01 0:0:0' and machine_id = 100;
commit;

-- Performance considerations
create index zones_trans_period_index on zones 
using spgist(trans_period);

create index zones_curr_trans_period_index on zones 
using gist(trans_period);
where upper(trans_period) = 'infinity';

alter table zones 
cluster on zones_zone_id_trans_period_key;
{% endhighlight %}
{% highlight sql %}
-- Calculating an MD5 hash

select md5(json_agg(z)::text) 
from (
    select zone_id, 
        to_char(lower(trans_period), 'YYYY-MM-DD HH24:MI:SSZ') as updated_at 
    from zones
    where upper(trans_period) = 'infinity'
) z;


-- Preventing an error on duplicate inserts
insert into zones (zone_id, project_id) 
values ($1, $2) 
on conflict 
    on constraint zones_zone_id_trans_period_excl do nothing;
    
    
-- Delaying execution
select *
from zones, pg_sleep(1);

select *
from zones, pg_sleep_for('1 minute');

select *
from zones, pg_sleep_until(now() + '1 minute');


-- Generating test data
select setseed(random());
select timestamp '2017-05-01 0:0:0' + random() * interval '1 day' 
from generate_series(1, 20);

select date '2017-01-01' + floor(random() * (date '2017-02-01' - date '2017-01-01'))::int 
from generate_series(1, 10);
{% endhighlight %}
{% highlight sql %}
-- Configuration options

set datestyle = sql,dmy;
select date '2017-01-16'; 
select date '16-01-2017'; 

set datestyle = sql,mdy;
select date '01-16-2017';

set datestyle = sql,ymd;
select date '2017-01-16';

set intervalstyle = postgres;
select interval '1 year 2 months 3 days 12:34:56';

set intervalstyle = postgres_verbose;
select interval '1 year 2 months 3 days 12:34:56';

set intervalstyle = sql_standard;
select interval '1 year 2 months 3 days 12:34:56';

set intervalstyle = iso_8601;
select interval '1 year 2 months 3 days 12:34:56';

set intervalstyle = sql_standard;
select interval '-1 year 2 months 3 days 12:34:56';
set intervalstyle = postgres;
select interval '-1 year 2 months 3 days 12:34:56';
{% endhighlight %}
