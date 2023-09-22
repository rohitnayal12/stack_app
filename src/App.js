import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import Navbar from './routes/Navbar';
import Footer from './routes/Footer';
import AddDataToChart from './components/AddDataToChart';
import AttendancePerformanceChart from './components/AttendancePerformanceChart';
import EditChartData from './components/EditChartData';
import RemoveChartData from './components/RemoveChartData';

function App() {
  return (
    <div className="App">
     {/* <Navbar/>
     <AllRoutes/>
     <Footer/> */}
     
     <AttendancePerformanceChart/><br/>
     {/* <AddDataToChart/><br/>
     <EditChartData/><br/>
     <RemoveChartData/><br/> */}
    </div>
  );
}

export default App;
