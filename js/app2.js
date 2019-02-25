////////////////////////Modal////////////////////
/***
 * Student Modeal
 */

const total_days = 12;

class Student{
    name;
    attendance =[];
    totalAbsences = ()=>{
        return this.attendance.filter(elem =>elem.isMissed).length;

    };

    constructor(nam){
        this.name=nam;

        for (let i=0; i <total_days; i++){
            this.attendance.push(new AttendanceStatus(i, false) );
        }
        console.log(this.totalAbsences());
    }
}

/***
 * Attendance status model
 */
class AttendanceStatus{
    dayNumber;
    isMissed;

    constructor(day, missed){
        this.dayNumber = day;
        this.isMissed = missed;
    }
}

/****
 * Student collection modal
 */
class StudentCollection {

    studentNames =
        ['Slappy the Frog',
            'Lilly the Lizard',
            'Paulrus the Walrus',
            'Gregory the Goat',
            'Adam the Anaconda'];
    students = [];

    constructor() {
        this.studentNames.forEach(  (name)=> {
            this.students.push(new Student(name));
        });
    }

     get(){

        return this.students;
     }

     save(){
        localStorage.students = this.students;
    }

}

/////////////////View //////////////////////////////

class TableViewFactory{


    static createTableHeader(){
        let domFragment =  document.createDocumentFragment();

        //<tr>
        let rowElement = document.createElement('tr');
        //<th>
        let header = document.createElement('th');
        header.innerText='Student Name';
        header.classList.add('name-col');

        rowElement.appendChild(header);

        for(let i=0;i<total_days;i++){
            let elem = document.createElement('th');
            elem.innerText = i+1;
            rowElement.appendChild(elem);
        }
        let footer = document.createElement('th');
        footer.classList.add('missed-col');
        footer.innerText = 'Days Missed-col';
        rowElement.appendChild(footer);

        domFragment.appendChild(rowElement);
        return domFragment
    }

    static createTableBody(studentCollection){

        let domFragment =  document.createDocumentFragment();
        studentCollection.get().forEach((student)=>{
            let rowElement = document.createElement('tr');
            rowElement.classList.add('student');
            let nameTdElement = document.createElement('td');
            nameTdElement.classList.add('name-col');
            nameTdElement.innerText=student.name;
            rowElement.appendChild(nameTdElement);
            student.attendance.forEach((attendanceStatus)=>{
                let attendColTdElement = document.createElement('td');
                attendColTdElement.classList.add('attend-col');
                let checkBoxElement = document.createElement('input');
                checkBoxElement.setAttribute('type','checkbox');
                checkBoxElement.checked = attendanceStatus.isMissed;
                attendColTdElement.appendChild(checkBoxElement);
                rowElement.appendChild(attendColTdElement);
            });
            let missedColElement = document.createElement('td');
            missedColElement.classList.add('missed-col');
            missedColElement.innerText = student.totalAbsences();
            rowElement.appendChild(missedColElement);
            domFragment.appendChild(rowElement);
        });
        return domFragment;

    }

}

class AttendanceView{
    students;
    constructor(studCollection){
        this.students = studCollection;
    }
    init(){
        let header = document.getElementById('table_header');
        header.appendChild(TableViewFactory.createTableHeader());

        let body = document.getElementById('table-body');
        body.appendChild(TableViewFactory.createTableBody(this.students));

    }
}

class Octopus{
    sc;
    av;
    constructor(){}

    init(){
        this.sc = new StudentCollection();
        this.av = new AttendanceView(this.sc);
        this.av.init();

    }

}

oct = new Octopus();
oct.init();