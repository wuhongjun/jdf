using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Threading;
using System.Diagnostics;
 

namespace JDF_UI
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }
        string b = "";
        Process cmd;
        private System.Timers.Timer timerClock = new System.Timers.Timer();   


        public void bb() {
            while(true) {
                Console.WriteLine("z");
                string a = cmd.StandardOutput.ReadLine();
                if (a != "")
                {
                    b = b + a;


                }

                a = cmd.StandardOutput.ReadLine();
                Thread.Sleep(1000);
            }
        }
          void OnTimer(object sender, System.Timers.ElapsedEventHandler e)
        {
            //Your code here 
        }
        public void aa() {
            //实例化一个进程类
            cmd = new Process();

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
            cmd.StandardInput.WriteLine("jdf b");
            //cmd.StandardInput.WriteLine("exit");


            //获取输出
            //需要说明的：此处是指明开始获取，要获取的内容，
            //<span style="color: #FF0000;">只有等进程退出后才能真正拿到</span>





            //cmd.WaitForExit();//等待控制台程序执行完成
            //cmd.Close();//关闭该进程

            Thread oThread1 = new Thread(new ThreadStart(bb));
            oThread1.Start();
 
        }


        
        private void Form2_Load(object sender, EventArgs e)
        {
           Thread oThread = new Thread(new ThreadStart(aa));
           oThread.Start();

          
      
        }

        private void timer1_Tick(object sender, EventArgs e)
        {

            Console.WriteLine(b);
            
        }
    }
}
