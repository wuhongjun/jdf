using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Threading; 

namespace JDF_UI.UC
{
    public partial class UC_Console : UserControl
    {
        public bool isCmdBusy = false;
        public StringBuilder _sb_pre_result;



        public bool isHolding = false;
        public StringBuilder _sb_hold_result;
        public Process cmdHold;
        public Thread timer;
        public Thread thHolder;


        public UC_Console()
        {
            InitializeComponent();
        }

        public void execAnsy(object cmdStr)
        {
            if (isCmdBusy)
            {
                MessageBox.Show("上一个任务还没有执行完毕，请稍等。");
                return;
            }
            timer_holder.Enabled = false;
            isCmdBusy = true;
            StringBuilder sb = new StringBuilder();
            sb.Append("执行命令:" + cmdStr);
            sb.Append(Environment.NewLine);
            sb.Append("---------------请稍后------------------");
            sb.Append(Environment.NewLine);
            richTextBoxCmd.Text = sb.ToString();
            richTextBoxCmd.SelectAll();
            richTextBoxCmd.SelectionColor = Color.YellowGreen;
            backgroundWorkerConsole.RunWorkerAsync(cmdStr);
        
        }

 

        void holderTimer()
        {
            while (true)
            {
                Thread.Sleep(200);
                if (cmdHold!=null)
                {
                    string result = cmdHold.StandardOutput.ReadLine();
                    if (result != "")
                    {
                        _sb_hold_result.Append(result);
                        _sb_hold_result.Append(Environment.NewLine);


                    }
                
                }
                
                
               
            }
        }

        public void execHoldAnsy(object cmdStr)
        {
            if (isHolding)
            {
                MessageBox.Show("当前已有挂起任务。");
                return;
            }
            timer_holder.Enabled = true;
            isHolding = true;
            StringBuilder sb = new StringBuilder();
            sb.Append("执行命令:" + cmdStr);
            sb.Append(Environment.NewLine);
            sb.Append("---------------请稍后------------------");
            sb.Append(Environment.NewLine);
            richTextBoxCmd.Text = sb.ToString();
            richTextBoxCmd.SelectAll();
            richTextBoxCmd.SelectionColor = Color.YellowGreen;

            thHolder = new Thread(new ParameterizedThreadStart(execCmdHold));
            thHolder.IsBackground = true;
            thHolder.Start(cmdStr);

            timer = new Thread(new ThreadStart(holderTimer));
            timer.IsBackground = true;
            timer.Start();

        }

        public void execCmdHold(object cmdStr_obj)
        {
            string cmdStr = (string)cmdStr_obj;
     

            //实例化一个进程类
            cmdHold = new Process();

            //获得系统信息，使用的是 systeminfo.exe 这个控制台程序
            cmdHold.StartInfo.FileName = "cmd.exe";

            //将cmd的标准输入和输出全部重定向到.NET的程序里

            cmdHold.StartInfo.UseShellExecute = false; //此处必须为false否则引发异常

            cmdHold.StartInfo.RedirectStandardInput = true; //标准输入
            cmdHold.StartInfo.RedirectStandardOutput = true; //标准输出
            cmdHold.StartInfo.RedirectStandardError = true;

            //不显示命令行窗口界面
            cmdHold.StartInfo.CreateNoWindow = false;
            cmdHold.StartInfo.WindowStyle = ProcessWindowStyle.Normal;

            cmdHold.Start(); //启动进程
            cmdHold.StandardInput.WriteLine(cmdStr);

            _sb_hold_result = new StringBuilder();

         
            

            

            

            //获取输出
            //需要说明的：此处是指明开始获取，要获取的内容，
            //<span style="color: #FF0000;">只有等进程退出后才能真正拿到</span>
            //string resultTxt = cmd.StandardOutput.ReadToEnd();

        }
 

        public void execCmd(object cmdStr_obj)
        {
            
            string cmdStr = (string)cmdStr_obj;
            _sb_pre_result.Append("执行:" + cmdStr);
            _sb_pre_result.Append(Environment.NewLine);
            _sb_pre_result.Append("---------------------------------------");
            _sb_pre_result.Append(Environment.NewLine);
  
            //实例化一个进程类
            Process cmd = new Process();

            //获得系统信息，使用的是 systeminfo.exe 这个控制台程序
            cmd.StartInfo.FileName = "cmd.exe";

            //将cmd的标准输入和输出全部重定向到.NET的程序里

            cmd.StartInfo.UseShellExecute = false; //此处必须为false否则引发异常

            cmd.StartInfo.RedirectStandardInput = true; //标准输入
            cmd.StartInfo.RedirectStandardOutput = true; //标准输出
            cmd.StartInfo.RedirectStandardError = true;

            //不显示命令行窗口界面
            cmd.StartInfo.CreateNoWindow = true;
            cmd.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;

            cmd.Start(); //启动进程
            cmd.StandardInput.WriteLine(cmdStr);
            cmd.StandardInput.WriteLine("exit");


            //获取输出
            //需要说明的：此处是指明开始获取，要获取的内容，
            //<span style="color: #FF0000;">只有等进程退出后才能真正拿到</span>
            string resultTxt = cmd.StandardOutput.ReadToEnd();

            cmd.WaitForExit();//等待控制台程序执行完成
            cmd.Close();//关闭该进程

            
            List<string> rList = new List<string>();
            rList.AddRange(System.Text.RegularExpressions.Regex.Split(resultTxt,Environment.NewLine));
            rList.RemoveRange(0,3);
            rList.RemoveAt(rList.Count-1);
            rList.RemoveAt(rList.Count - 1);
            StringBuilder sb = new StringBuilder();
            foreach (string s in rList) {
                sb.Append(s);
                sb.Append(Environment.NewLine);
            }
            _sb_pre_result.Append(sb.ToString());
            isCmdBusy = false;
           
        
        }

        private void UC_Console_Load(object sender, EventArgs e)
        {
            timer_holder.Enabled = false;
            
        }

        private void backgroundWorkerConsole_DoWork(object sender, DoWorkEventArgs e)
        {

            
            _sb_pre_result = new StringBuilder();
            execCmd((string)e.Argument);
        }

        private void backgroundWorkerConsole_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
          
            var txt=_sb_pre_result.ToString();
            richTextBoxCmd.Text = txt;
            var ts = System.Text.RegularExpressions.Regex.Split(txt, Environment.NewLine);
            richTextBoxCmd.Select(0, ts[0].Length+ts[1].Length+1);
            richTextBoxCmd.SelectionColor = Color.ForestGreen;
            MessageBox.Show("执行完毕！", "当前信息");
        }

        private void timer_holder_Tick(object sender, EventArgs e)
        {
            richTextBoxCmd.Text = _sb_hold_result.ToString();
        }

        public void closeHold() {
            if (isHolding)
            {
                isHolding = false;
                
                cmdHold.CloseMainWindow();
                cmdHold.Close();
                timer.Abort();
                thHolder.Abort();
            }
            
            
        
        }
    }
}
