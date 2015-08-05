using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Runtime.InteropServices;
namespace JDF_UI
{

    public partial class Form1 : Form
    {
  



        public int statusFlag = 0;
        public Form1()
        {
            InitializeComponent();
            Common.form1 = this;
        }
        private void Form1_Resize(object sender, EventArgs e)
        {
           
            
        }


        public void setCurrentPath(string path){
            uC_JDF_UserInterface1.setCurrentPath(path);
        }

        private void uC_FolderTree1_Load(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

       public  void showEditorView() {
            splitContainer2.Visible = false;
            uC_Editor1.Visible = true;
            uC_Editor1.Dock = DockStyle.Fill;
            statusFlag = 1;
        
        }
       public void showConsoleView()
       {
            splitContainer2.Visible = true;
            uC_Editor1.Visible = false;
            uC_Editor1.Dock = DockStyle.Fill;
            statusFlag = 0;
        
        }

       public void showFile(string path) {
           uC_Editor1.addNewTab(path);
       
       }

       private void Form1_FormClosed(object sender, FormClosedEventArgs e)
       {

           uC_Console1.closeHold();
       }

   
 

    }
        
}
