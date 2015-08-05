using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Runtime.InteropServices;

namespace JDF_UI.UC
{
    public partial class UC_JDF_UserInterface : UserControl
    {
   
      

        string currentFilePath;
        public UC_JDF_UserInterface()
        {
            InitializeComponent();
        }
        public void setCurrentPath(string path)
        {
            currentFilePath = path;
            labelCurrentPath.Text = currentFilePath;
        }

        private void pictureBox5_Click(object sender, EventArgs e)
        {
            
            var jdfPath = getJDFPath(currentFilePath);
            if (jdfPath=="") {
                MessageBox.Show(currentFilePath + Environment.NewLine + "这不是一个JDF工程目录","当前信息");
                return;
            }
            var diskName=labelCurrentPath.Text.Split('\\')[0];
            var jdfCmd = diskName + " &cd " + jdfPath + "& jdf output " + currentFilePath.Replace(jdfPath + "\\", string.Empty);

            if(radioButtonDebug.Checked){
                jdfCmd += " -debug";
                
            }
        
            Common.form1.uC_Console1.execAnsy(jdfCmd);
        }

        string getJDFPath(string path) {
            string result="";
            if (File.Exists(path))
            {
                FileInfo fi = new FileInfo(path);
                DirectoryInfo di = fi.Directory;
                while (di.GetFiles("config.json", SearchOption.TopDirectoryOnly).Length <= 0)
                {

                    di = di.Parent;
                    if (di==null)
                    {
                        return result;
                    }
                }
                result = di.FullName;
            }
            if (Directory.Exists(path))
            {
                DirectoryInfo di = new DirectoryInfo(path);
                while (di.GetFiles("config.json", SearchOption.TopDirectoryOnly).Length <= 0)
                {
                    di = di.Parent;
                    if (di == null)
                    {
                        return result;
                    }
                }
                result = di.FullName;
            
            }



            return result;
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            //var jdfPath = getJDFPath(currentFilePath);
            //if (jdfPath == "")
            //{
            //    MessageBox.Show(currentFilePath + Environment.NewLine + "这不是一个JDF工程目录", "当前信息");
            //    return;
            //}
           // var diskName = labelCurrentPath.Text.Split('\\')[0];
           // var jdfCmd = diskName + " &cd " + jdfPath + "& jdf output " + currentFilePath.Replace(jdfPath + "\\", string.Empty);

            Common.form1.uC_Console1.execHoldAnsy("jdf b");
        }
        private void pictureBox4_Click(object sender, EventArgs e)
        {
            var jdfPath = getJDFPath(currentFilePath);
            if (jdfPath == "")
            {
                MessageBox.Show(currentFilePath + Environment.NewLine + "这不是一个JDF工程目录", "当前信息");
                return;
            }
            var diskName = labelCurrentPath.Text.Split('\\')[0];
            var jdfCmd = diskName + " &cd " + jdfPath + "& jdf";

  

            Common.form1.uC_Console1.execAnsy(jdfCmd);
        }

        private void pictureBox6_Click(object sender, EventArgs e)
        {
            var jdfPath = getJDFPath(currentFilePath);
            if (jdfPath == "")
            {
                MessageBox.Show(currentFilePath + Environment.NewLine + "这不是一个JDF工程目录", "当前信息");
                return;
            }
            var diskName = labelCurrentPath.Text.Split('\\')[0];
            var jdfCmd = diskName + " &cd " + jdfPath + "& jdf upload " + currentFilePath.Replace(jdfPath + "\\", string.Empty);

            if (radioButtonDebug.Checked)
            {
                jdfCmd += " -debug";

            }

            Common.form1.uC_Console1.execAnsy(jdfCmd);
        }

        private void pictureBox2_Click(object sender, EventArgs e)
        {
            Common.form1.uC_Console1.closeHold();
        }

        private void pictureBox3_Click(object sender, EventArgs e)
        {
            Common.form1.uC_Console1.closeHold();
            Common.form1.uC_Console1.execHoldAnsy("jdf b");

        }

 
    }
}
