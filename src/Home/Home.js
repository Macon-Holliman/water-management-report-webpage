import React, { Component } from 'react';
import './Home.scss';



class Home extends Component {

  componentDidMount() {


    //Setting Initial Data Array//////////////////
    //First index reserved to store information on the sheet.

    for (var x = 1; x < 32; x++) {
      var show = false;
      if (x == 1) { show = true }; //Enable first day by default
      this.state.Data.push(
        {
          Show: show,
          Day: x,
          Hour: 0,
          Minute: 0,
          Period: "PM",
          W1Previous: 0,
          W1Current: 0,
          W1Gallons: 0,
          W2Previous: 0,
          W2Current: 0,
          W2Gallons: 0,
          Cl2: 1.20,
          pH: 8.7,
          Alkalinity: "",
          Calcium: "",
          Generator: "",
          Oil: "",
          Lime: "",
          LimeUnit: ""
        }
      );
    }
    this.UpdateHtml();
    this.UpdateDate();
    this.UpdateYear(this.state.Year);
    this.UpdateMonth(this.state.Month);
    this.UpdateCalender();
    this.CreateDropdowns();

    var date = new Date();
    this.state.DateOfToday = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

    


    ///////////////////////////////

  }

  constructor(props) {
    super(props);
    this.state = {
      LoadData: [],
      Year: 2020,
      Month: "January",
      Extra: "",
      MonthNum: 1,
      NumberOfDays: 0,
      Well: 0,
      ID: 0,
      Data: [
        {
          Year: 2020,
          Month: "January",
          MonthNum: 1,
          Well: 0,
          ID: 0,
          Extra: ""
        }
      ],
      DayInfo: [],
      WellOneInfo: [],
      WellTwoInfo: [],
      OtherInfo: [],
      DateCalender: [],
      Total: 0,
      W1Total: 0,
      W2Total: 0,
      DateOfToday: "",
      WellOptions: [1,2,3],
      WellOptionsList: [],
    }
  }

  render() {

    return (

      <div class="home-wrapper">

        <div class="home-content">
          <div class="home-content-options">
            <div class="top-options" style={{'display':'block', 'height':'720px'}}>
              <form class="options">

                <span class="option-section">
                  <label>Well #</label>
                    <label class="well-options opts">
                      <div class="well-opts-dropdown">
                        {this.state.WellOptionsList}
                      </div>
                      +
                    </label>
                  <input id="well-input" type="text" value={this.state.Well} onChange={this.UpdateWell()} />
                </span>
                <span class="option-section">
                  <label>ID</label>
                  <input id="id-input" type="text" value={this.state.ID} onChange={this.UpdateID()} />
                </span>
                <span class="option-section">
                  <label>Year</label>
                  <input type="text" value={this.state.Year} onChange={this.UpdateYear()} />
                </span>
                <span class="option-section">
                  <label>Month</label>
                  <input type="text" value={this.state.Month} onChange={this.UpdateMonth(this.state.Month)} />
                </span>
                <span class="option-section extra">
                  <label>Extra Info</label>
                  <input type="text" value={this.state.Extra} onChange={this.UpdateExtra(this.state.Extra)} />
                </span>

              </form>

              <div class="date-selector">
                <div class="calender-container">

                  <div class="calender-date-day">
                    Su
              </div>
                  <div class="calender-date-day">
                    Mo
              </div>
                  <div class="calender-date-day">
                    Tu
              </div>
                  <div class="calender-date-day">
                    We
              </div>
                  <div class="calender-date-day">
                    Th
              </div>
                  <div class="calender-date-day">
                    Fr
              </div>
                  <div class="calender-date-day">
                    Sa
              </div>


                  {this.state.DateCalender}
                </div>



              </div>

              
              <div class="printing-info">
                <li>To print this document, click/hover the 'water drop' logo at the top of the document to hide/show options.</li>
                <li>Ensure "Background Graphics" is selected in print settings to get the images/colors as they're on your screen.</li>
              </div>

              <a id="downloadAnchorElem" class="download-button" onClick={() => { this.DownloadJson() }}>
                Download Data (Backup) 
              </a>

              <a id="HideAnchorElem" class="hide-button"  onClick={() => { this.HideOptions() }}>
                Hide Options
              </a>

              <a id="uploadAnchorElem" class="upload-button">
                <span id="ready" onClick={() => {this.LoadData()}}>Upload (Data/Backup)</span>
                <input type="file" id="myFile" class="upload-files" multiple size="50"  onClick={() => { this.UploadJson() }}  onChange={this.OpenFile()}/>
                <div id="uploaded-data" style={{'display':'none'}}></div>
              </a>

            </div>
            <div class="data-header-backdrop">
              <div id="sheet" class="data-header">

                <div class='half-wrapper'>
                  <div class="half" style={{ 'width': '40%' }}>
                    <div class="half-inner">
                      <div class="split-info-title">
                        <h3 class="info-title">
                          Well
            </h3>
                        <div class="header-text">{this.state.Well}</div>
                      </div>
                      <div class="split-info-title">
                        <h3 class="info-title">
                          ID #
            </h3>
                        <div class="header-text">{this.state.ID}</div>
                      </div>

                    </div>
                  </div>

                  <div class="water-drop" id="water-logo" onClick={() => { this.CreatePrintable() }}  onMouseOver={() => { this.CreatePrintable() }}></div>
                  


                  <div class="half" style={{ 'width': '40%' }}>
                    <div class="half-inner-right">
                      <div class="split-info-title-right">
                        <h3 class="info-title-right">
                          Master Water Readings
            </h3>
                      </div>
                      <div class="split-info-title-right">
                        <h3 class="info-title-right">
                          [Company Name]
            </h3>
                      </div>

                    </div>

                  </div>
                </div>


                <div class='top-info'>
                  <div class='top-info-well-one'>Well #1
              </div>
                  <div class='top-info-well-two'>Well #2
              </div>
                  <div class='top-info-date'>{this.state.Year} / {this.state.Month}
                  </div>
                  <div class='top-info-other'>Other Info
              </div>

                </div>

                <div class="data-wrapper">

                  <div class="data-left">
                    <div class="well-info-card">

                      <div class="gallons-data">
                        <ul class='gallons-day'>
                          <li class="gallons">
                            Previous
            </li>
                          <li class="gallons">
                            Current
            </li>
                          <li class="gallons">
                            Gallons
            </li>
                        </ul>
                      </div>

                      <div class="gallons-data">

                        {this.state.WellOneInfo}




                      </div>




                    </div>
                  </div>


                  <div class="data-right">
                    <div class="well-info-card">

                      <div class="gallons-data">
                        <ul class='gallons-day'>
                          <li class="gallons">
                            Previous
            </li>
                          <li class="gallons">
                            Current
            </li>
                          <li class="gallons">
                            Gallons
            </li>
                        </ul>
                      </div>



                      <div class="gallons-data">


                        {this.state.WellTwoInfo}


                      </div>






                    </div>
                  </div>


                  <div class="data-middle">

                    <div class="well-info-card">

                      <div class="middle-data-inner">
                        <ul class='middle-list-inner'>
                          <li class="middle-inner-day">
                            Day
            </li>
                          <li class="middle-inner-time">
                            Time
            </li>
                          <li class="middle-inner">
                            Cl2
            </li>
                          <li class="middle-inner">
                            pH
            </li>
                        </ul>
                      </div>


                      <div class="middle-data-inner">


                        {this.state.DayInfo}

                      </div>




                    </div>

                  </div>




                  <div class="data-middle-optional">

                    <div class="well-info-card">

                      <div class="middle-data-inner-optional">
                        <ul class='middle-list-inner-optional'>
                          <li class="middle-inner-optional lime">
                            Lime
            </li>
                          <li class="middle-inner-optional gen">
                            Gen.
            </li>
                          <li class="middle-inner-optional oil">
                            Oil
            </li>
                          <li class="middle-inner-optional alky">
                            ALKY
            </li>
                          <li class="middle-inner-optional ca">
                            Ca
            </li>
                        </ul>
                      </div>


                      <div class="middle-data-inner-optional">

                        {this.state.OtherInfo}



                      </div>




                    </div>

                  </div>


                </div>

                <div class="extra-text" id="extra-text" style={{'display':'none'}}>
                      {this.state.Extra}
                    </div>
                <div class='half-wrapper-bottom-extra'>
                  <div class='half-wrapper-bottom'>
                    <div class="half">
                      <div class="half-inner">
                        <div class="split-info-title">
                          <h3 class="info-title">
                            Total
            </h3>
                          <div class="header-text">{this.state.Total}k</div>
                        </div>
                        <div class="split-info-title-alt">
                          <h3 class="info-title">
                            Well 1
            </h3>
                          <div class="header-text">{this.state.W1Total}k</div>
                        </div>
                        <div class="split-info-title">
                          <h3 class="info-title">
                            Well 2
            </h3>
                          <div class="header-text">{this.state.W2Total}k</div>
                        </div>

                      </div>
                    </div>
                    <div class="half">
                      <div class="half-inner-right">
                        <div class="split-info-title-right">
                          <h3 class="info-title-right">
                            Water Operator: [Name]
            </h3>
                        </div>
                        <div class="split-info-title-right-alt">
                          <h3 class="info-title-right">
                            {this.state.Month} / {this.state.Year}
                          </h3>
                        </div>
                        <div class="split-info-title-right">
                          <h3 class="info-title-right">
                            Printed: {this.state.DateOfToday}
                          </h3>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                <div class="totals">
                  <div class="total-block">
                    <span class="total-name">Total: </span>
                    <span class="total-num">{this.state.Total}k</span>
                  </div>
                  <div class="total-block">
                    <span class="total-name">Well 1: </span>
                    <span class="total-num">{this.state.W1Total}k</span>
                  </div>
                  <div class="total-block">
                    <span class="total-name">Well 2: </span>
                    <span class="total-num">{this.state.W2Total}k</span>
                  </div>

                </div>
              </div></div>

            <div class="home-content-left">

            </div>
            <div class="home-content-lower">

              <div class="home-content-lower-inner">

                <div class="main-page">


                </div>




              </div>
            </div>
          </div>
        </div>



      </div>


    );
  }


  UpdateCalender = () => {

    var DayOfWeek = new Date(this.state.Year, this.state.MonthNum - 1, 1).getDay();
    this.state.DateCalender = [];

    //pushing empty slots to adjust days slot
    for (var x = 0; x < DayOfWeek; x++) {
      this.state.DateCalender.push(

        <div class="calender-date-disabled" onClick={this.ToggleDate(x)}>
          X
        </div>

      );
    }



    for (var x = 1; x < this.state.NumberOfDays + 1; x++) //For length of days
    {
      if (x == this.state.NumberOfDays) {

        this.state.DateCalender.push(

          <div class="calender-date-active" onClick={this.ToggleDate(x)}>
            {x}
          </div>
        );
      }
      else if (this.state.Data[x].Show == false) {
        this.state.DateCalender.push(

          <div class="calender-date" onClick={this.ToggleDate(x)}>
            {x}
          </div>
        );
      }
      else {
        this.state.DateCalender.push(

          <div class="calender-date-active" onClick={this.ToggleDate(x)}>
            {x}
          </div>
        );

      }

    }

    //Fill the rest of the empty day slots
    while (this.state.DateCalender.length < 35) {
      this.state.DateCalender.push(

        <div class="calender-date-disabled" onClick={this.ToggleDate(x)}>
          X
        </div>

      );
    }

    this.setState({
      DateCalender: this.state.DateCalender,
    });

  }

  UpdateHtml = () => {

    this.state.Data[0].Month = this.state.Month;

    this.state.DayInfo = [];
    this.state.WellOneInfo = [];
    this.state.WellTwoInfo = [];
    this.state.OtherInfo = [];

    this.state.W1Total = 0;
    this.state.W2Total = 0;


    for (var x = 1; x < this.state.Data.length; x++) //For length of days
    {
      if (this.state.Data[x].Show == true) //Only select days that are toggled to be used
      {

        this.state.DayInfo.push(


          <ul class='middle-list-inner'>
            <li class="middle-inner-day">
              {x}
            </li>
            <li class="middle-inner-time show">
              <input type="text" class="time-input" value={this.state.Data[x].Hour} onChange={this.UpdateHour(x)} />
              <input type="text" class="time-input" value={this.state.Data[x].Minute} onChange={this.UpdateMinute(x)} />
              <span class="period-input" onClick={this.UpdatePeriod(x)}>{this.state.Data[x].Period}</span>
            </li>
            <li class="middle-inner-time hidden">
              <span class="time-display"> {this.state.Data[x].Hour}:
            {this.state.Data[x].Minute} </span>
              <span class="period-display">{this.state.Data[x].Period}</span>
            </li>
            <li class="middle-inner show">
              <input type="text" class="chlorine-input" value={this.state.Data[x].Cl2} onChange={this.UpdateChlorine(x)} />
            </li>
            <li class="middle-inner hidden">
              {this.state.Data[x].Cl2} mg/l
          </li>
            <li class="middle-inner show">
              <input type="text" class="ph-input" value={this.state.Data[x].pH} onChange={this.UpdatePH(x)} />
            </li>
            <li class="middle-inner hidden">
              {this.state.Data[x].pH}
            </li>
          </ul>
        );


        if (x != 1) { //Ignore first since we're not concerned with the change from last month to the first

          //Find the closest used index before the day 'x'
          var prevIndex = 0;
          for (var y = x - 1; y > 0; y--) {
            if (this.state.Data[y].Show == true) {
              prevIndex = y;
              break;
            }
          }
          this.state.Data[x].W1Previous = this.state.Data[prevIndex].W1Current;
          this.state.Data[x].W1Gallons = this.state.Data[x].W1Current - this.state.Data[prevIndex].W1Current;

          this.state.Data[x].W2Previous = this.state.Data[prevIndex].W2Current;
          this.state.Data[x].W2Gallons = this.state.Data[x].W2Current - this.state.Data[prevIndex].W2Current;


          this.state.W1Total += this.state.Data[x].W1Gallons;
          this.state.W2Total += this.state.Data[x].W2Gallons;
        }
        this.state.WellOneInfo.push( //Well Info One Data


          <ul class='gallons-day'>
            <li class="gallons" style={{ 'width': '29%', 'border-right': '1px solid black' }}>
              {this.state.Data[x].W1Previous}k
          </li>
            <li class="gallons show" style={{ 'width': '40%' }}>
              <input type="text" class="gallons-input" value={this.state.Data[x].W1Current} onChange={this.UpdateW1Info(x)} style={{ 'width': '70%' }} />k
          </li>
            <li class="gallons hidden" style={{ 'width': '40%' }}>
              <span>{this.state.Data[x].W2Current}k</span>
            </li>
            <li class="gallons" style={{ 'width': '29%', 'border-left': '1px solid black' }}>
              {this.state.Data[x].W1Gallons}k
          </li>
          </ul>
        );

        this.state.WellTwoInfo.push( //Well Info Two Data


          <ul class='gallons-day'>
            <li class="gallons" style={{ 'width': '29%', 'border-right': '1px solid black' }}>
              {this.state.Data[x].W2Previous}k
          </li>
            <li class="gallons show" style={{ 'width': '40%' }}>
              <input type="text" class="gallons-input" value={this.state.Data[x].W2Current} onChange={this.UpdateW2Info(x)} style={{ 'width': '70%' }} />k
          </li>
            <li class="gallons hidden" style={{ 'width': '40%' }}>
              <span>{this.state.Data[x].W2Current}k</span>
            </li>
            <li class="gallons" style={{ 'width': '29%', 'border-left': '1px solid black' }}>
              {this.state.Data[x].W2Gallons}k
          </li>
          </ul>
        );

        this.state.OtherInfo.push(  //Other Info

          <ul class='middle-list-inner-optional'>
            <li class="middle-inner-optional show">
              <input type="text" class="optional-input" value={this.state.Data[x].Lime} onChange={this.UpdateLime(x)} />
            </li>
            <li class="middle-inner-optional hidden lime">
              {this.state.Data[x].Lime}{this.state.Data[x].LimeUnit}
            </li>
            <li class="middle-inner-optional show">
              <input type="text" class="optional-input" value={this.state.Data[x].Generator} onChange={this.UpdateGenerator(x)} />
            </li>
            <li class="middle-inner-optional hidden gen">
              {this.state.Data[x].Generator}
            </li>
            <li class="middle-inner-optional show">
              <input type="text" class="optional-input" value={this.state.Data[x].Oil} onChange={this.UpdateOil(x)} />
            </li>
            <li class="middle-inner-optional hidden oil">
              {this.state.Data[x].Oil}
            </li>
            <li class="middle-inner-optional show">
              <input type="text" class="optional-input" value={this.state.Data[x].Alkalinity} onChange={this.UpdateAlkalinity(x)} />
            </li>
            <li class="middle-inner-optional hidden alky">
              {this.state.Data[x].Alkalinity}
            </li>
            <li class="middle-inner-optional show">
              <input type="text" class="optional-input" value={this.state.Data[x].Calcium} onChange={this.UpdateCalcium(x)} />
            </li>
            <li class="middle-inner-optional hidden ca">
              {this.state.Data[x].Calcium}
            </li>
          </ul>
        );


      }

    }


    if(this.state.Well == 2) //This well is calculated different, Well '1' is technically processing all of it. Well '2' is still separate, subtract well 2 from well 1 to get Well 1.
    {
      this.state.W1Total = this.state.W1Total - this.state.W2Total;
    }
    this.state.Total = this.state.W1Total + this.state.W2Total;



    this.setState({
      DayInfo: this.state.DayInfo,
      WellOneInfo: this.state.WellOneInfo,
      WellTwoInfo: this.state.WellTwoInfo,
      OtherInfo: this.state.OtherInfo,
      W1Total: this.state.W1Total,
      W2Total: this.state.W2Total,
      Total: this.state.Total,
    });
  }

  ToggleDate = (day) => () => {
    if (day != 1 && day != this.state.NumberOfDays) //Prevent the first and last day of the month from being disabled
    {
      this.state.Data[day].Show = !this.state.Data[day].Show;
    }
    this.setState({
      Data: this.state.Data
    })
    this.UpdateCalender();
    this.UpdateHtml();
  }


  CreatePrintable = () => {
    var hidden = document.getElementsByClassName("hidden");
    var show = document.getElementsByClassName("show");
    var options = document.getElementsByClassName("top-options");

    for(var x = 0; x < hidden.length; x++)
    {
      if (hidden[x].style.display != "inline-block") {
        hidden[x].style.display = "inline-block";
        show[x].style.display = "none";
      }
      else {
        hidden[x].style.display = "";
        show[x].style.display = "inline-block";
      }
    }

    this.HideOptions();


  }

  HideOptions = () => {
    
    var options = document.getElementsByClassName("top-options");

    if (options[0].style.height == "720px") {
      options[0].style.height = "0px";
    }
    else {
      options[0].style.height = "720px";
    }

  }

  UploadJson = () => {
    var x = document.getElementById("myFile");
    x.setAttribute("type", "file");
    var txt = "";
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          txt += "<br><strong>" + (i+1) + ". file</strong><br>";
          var file = x.files[i];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
          }
        }
      }
  }
  }

  LoadData = () =>
  {
    var output = document.getElementById('uploaded-data');
    this.state.LoadData = JSON.parse(output.innerHTML);
    if(this.state.LoadData != "")
    {

      this.setState({
        Data: this.state.LoadData,
        Month: this.state.LoadData[0].Month,
        Year: this.state.LoadData[0].Year,
        MonthNum: this.state.LoadData[0].MonthNum,
        Well: this.state.LoadData[0].Well,
        ID: this.state.LoadData[0].ID,
          }, () => {
            this.UpdateDate()
            this.UpdateCalender()
          });

      document.getElementById("myFile").value = "";
      var output = document.getElementById('ready');
      output.className = "";
      
    }
  }

  OpenFile = () => (e) =>  {
    var input = e.currentTarget;

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;

      var output = document.getElementById('uploaded-data');
      output.innerHTML = dataURL;

      
      var output = document.getElementById('ready');
      if(!output.className.includes("ready"))
      {
        output.className += " ready";
      }


    };
    reader.readAsText(input.files[0]);
  
  }

  DownloadJson = () => {


    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.Data));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    var fileName = this.state.Data[0].Year + "-" + this.state.Data[0].Month + "-" + "Well-" + this.state.Data[0].Well + ".json";
    dlAnchorElem.setAttribute("download", fileName);
  }


  PrintForm = () => {



    var elem = 'sheet';
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();

    return true;
  }

  UpdateID = () => (e) => {
    this.state.Data[0].ID = e.target.value;
    this.setState({
      ID: e.target.value,
    });
  }
  UpdateWell = () => (e) => {
    this.state.Data[0].Well = e.target.value;
    this.setState({
      Well: e.target.value,
    });
  }

  

  UpdateExtra = () => (e) => {
    this.state.Data[0].Extra = e.target.value;
    this.state.Extra = e.target.value;

    if(this.state.Extra != "")
    {
      var x = document.getElementById("extra-text");
      x.style.display = "inline-block";
    }
    if(this.state.Extra == "")
    {
      var x = document.getElementById("extra-text");
      x.style.display = "none";
    }

    this.setState({
      Extra: e.target.value,
    });
  }

  UpdateMonth = (month) => (e) => {
    this.state.MonthNum = 0;
    this.state.Month = e.target.value;
    this.state.Data[0].Month = e.target.value;


    if (this.state.Month == "January") { this.state.MonthNum = 1; this.state.Data[0].MonthNum = 1;  }
    if (this.state.Month == "February") { this.state.MonthNum = 2; this.state.Data[0].MonthNum = 2; }
    if (this.state.Month == "March") { this.state.MonthNum = 3; this.state.Data[0].MonthNum = 3;  }
    if (this.state.Month == "April") { this.state.MonthNum = 4; this.state.Data[0].MonthNum = 4;  }
    if (this.state.Month == "May") { this.state.MonthNum = 5; this.state.Data[0].MonthNum = 5;  }
    if (this.state.Month == "June") { this.state.MonthNum = 6; this.state.Data[0].MonthNum = 6;  }
    if (this.state.Month == "July") { this.state.MonthNum = 7; this.state.Data[0].MonthNum = 7;  }
    if (this.state.Month == "August") { this.state.MonthNum = 8; this.state.Data[0].MonthNum = 8;  }
    if (this.state.Month == "September") { this.state.MonthNum = 9; this.state.Data[0].MonthNum = 9;  }
    if (this.state.Month == "October") { this.state.MonthNum = 10; this.state.Data[0].MonthNum = 10;  }
    if (this.state.Month == "November") { this.state.MonthNum = 11; this.state.Data[0].MonthNum = 11; }
    if (this.state.Month == "December") { this.state.MonthNum = 12; this.state.Data[0].MonthNum = 12; }
    this.setState({
      Month: this.state.Month,
      MonthNum: this.state.MonthNum
    });
    this.UpdateDate();
    this.UpdateCalender();
  }
  UpdateYear = (year) => (e) => {
    this.state.Year = e.target.value;
    this.state.Data[0].Year = e.target.value;
    this.setState({
      Year: this.state.Year
    });

    this.UpdateDate();
    this.UpdateCalender();
  }

  UpdateDate = () => {

    if (this.state.Year < 3000 && this.state.Year > 2000 && this.state.MonthNum <= 12 && this.state.MonthNum >= 1) {

      this.state.Data[this.state.NumberOfDays].Show = false;
      this.state.NumberOfDays = new Date(this.state.Year, this.state.MonthNum, 0).getDate();
      this.state.Data[this.state.NumberOfDays].Show = true;
      this.setState({
        NumberOfDays: this.state.NumberOfDays
      });
    }
    this.UpdateHtml();
  }

  
  CreateDropdowns = () => {


      this.state.WellOptionsList.push(
        <div>

        <div class="dropdown-options" onClick={() => {
          this.state.Data[0].Well = 1;
          this.state.Data[0].ID = "1";
          this.setState({
            Well: 1,
            ID: "1",
          });}}>
          {this.state.WellOptions[0]}
        </div>
        <div class="dropdown-options" onClick={() => {
          this.state.Data[0].Well = 2;
          this.state.Data[0].ID = "2";
          this.setState({
            Well: 2,
            ID: "2",
          });}}>
          {this.state.WellOptions[1]}
        </div>
        <div class="dropdown-options" onClick={() => {
          this.state.Data[0].Well = 3;
          this.state.Data[0].ID = "3";
          this.setState({
            Well: 3,
            ID: "3",
          });}}>
          {this.state.WellOptions[2]}
        </div>

        </div>
      );

    

    this.setState({
      WellOptionsList: this.state.WellOptionsList,
    });
  }


  UpdateHour = (day) => (e) => {

    if (e.target.value <= 12 && e.target.value >= 1) {
      this.state.Data[day].Hour = e.target.value;
    }

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateMinute = (day) => (e) => {

    if (e.target.value <= 59 && e.target.value >= 0) {
      this.state.Data[day].Minute = e.target.value;
    }

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdatePeriod = (day) => (e) => {
    if (this.state.Data[day].Period == "AM") { this.state.Data[day].Period = "PM" }
    else if (this.state.Data[day].Period == "PM") { this.state.Data[day].Period = "AM" };

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }

  UpdateChlorine = (day) => (e) => {

    this.state.Data[day].Cl2 = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdatePH = (day) => (e) => {

    this.state.Data[day].pH = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateLime = (day) => (e) => {


    this.state.Data[day].Lime = e.target.value;
    if (e.target.value != "") {
      this.state.Data[day].LimeUnit = " lbs";
    }

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateGenerator = (day) => (e) => {

    this.state.Data[day].Generator = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateOil = (day) => (e) => {

    this.state.Data[day].Oil = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateAlkalinity = (day) => (e) => {

    this.state.Data[day].Alkalinity = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateCalcium = (day) => (e) => {

    this.state.Data[day].Calcium = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }





  UpdateW1Info = (day) => (e) => {

    this.state.Data[day].W1Current = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }
  UpdateW2Info = (day) => (e) => {

    this.state.Data[day].W2Current = e.target.value;

    this.setState({
      Data: this.state.Data
    });
    this.UpdateHtml();
  }






}

export default Home;
