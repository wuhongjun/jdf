using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;

namespace JDF_UI
{
    public partial class UC_TitleLogo : UserControl
    {
        public UC_TitleLogo()
        {
            InitializeComponent();
         
        }



        public void adjustSwitchBtn()
        {


            switch (Common.form1.statusFlag)
            {
                case 0:
                    this.pictureBox_switchBtn_left.Visible = false;
                    this.pictureBox_switchBtn_right.Visible = true;
                    ; break;
                case 1:
                    this.pictureBox_switchBtn_left.Visible = true;
                    this.pictureBox_switchBtn_right.Visible = false;
                    ; break;

            }
          
        
        }

        private void UC_TitleLogo_Load(object sender, EventArgs e)
        {
            adjustSwitchBtn();
            
           
        }









        private void pictureBox_switchBtn_left_MouseEnter(object sender, EventArgs e)
        {

        }

        private void pictureBox_switchBtn_left_MouseLeave(object sender, EventArgs e)
        {

        }

        private void pictureBox_switchBtn_left_MouseDown(object sender, MouseEventArgs e)
        {

        }


        private void pictureBox_switchBtn_left_Click(object sender, EventArgs e)
        {

            if (Common.form1.statusFlag == 1)
            {
                Common.form1.showConsoleView();
            }
            adjustSwitchBtn();
        }




        

        private void pictureBox_switchBtn_right_MouseDown(object sender, MouseEventArgs e)
        {

        }

        private void pictureBox_switchBtn_right_MouseEnter(object sender, EventArgs e)
        {

        }

        private void pictureBox_switchBtn_right_MouseLeave(object sender, EventArgs e)
        {

        }

        private void pictureBox_switchBtn_right_Click(object sender, EventArgs e)
        {


            if (Common.form1.statusFlag == 0)
            {
                Common.form1.showEditorView();
            }
            adjustSwitchBtn();
        }

        
    }
}
