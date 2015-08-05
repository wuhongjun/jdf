namespace JDF_UI.UC
{
    partial class UC_JDF_UserInterface
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.panel_main = new System.Windows.Forms.Panel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.radioButtonRelease = new System.Windows.Forms.RadioButton();
            this.radioButtonDebug = new System.Windows.Forms.RadioButton();
            this.labelCurrentPath = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.pictureBox6 = new System.Windows.Forms.PictureBox();
            this.pictureBox5 = new System.Windows.Forms.PictureBox();
            this.pictureBox4 = new System.Windows.Forms.PictureBox();
            this.pictureBox3 = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.label1 = new System.Windows.Forms.Label();
            this.panel_main.SuspendLayout();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox6)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox5)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox3)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // panel_main
            // 
            this.panel_main.Controls.Add(this.panel1);
            this.panel_main.Controls.Add(this.labelCurrentPath);
            this.panel_main.Controls.Add(this.label2);
            this.panel_main.Controls.Add(this.pictureBox6);
            this.panel_main.Controls.Add(this.pictureBox5);
            this.panel_main.Controls.Add(this.pictureBox4);
            this.panel_main.Controls.Add(this.pictureBox3);
            this.panel_main.Controls.Add(this.pictureBox2);
            this.panel_main.Controls.Add(this.pictureBox1);
            this.panel_main.Controls.Add(this.label1);
            this.panel_main.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel_main.Location = new System.Drawing.Point(0, 0);
            this.panel_main.Name = "panel_main";
            this.panel_main.Size = new System.Drawing.Size(663, 394);
            this.panel_main.TabIndex = 8;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.radioButtonRelease);
            this.panel1.Controls.Add(this.radioButtonDebug);
            this.panel1.Location = new System.Drawing.Point(333, 202);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(104, 80);
            this.panel1.TabIndex = 10;
            // 
            // radioButtonRelease
            // 
            this.radioButtonRelease.AutoSize = true;
            this.radioButtonRelease.Location = new System.Drawing.Point(12, 44);
            this.radioButtonRelease.Name = "radioButtonRelease";
            this.radioButtonRelease.Size = new System.Drawing.Size(65, 16);
            this.radioButtonRelease.TabIndex = 10;
            this.radioButtonRelease.Text = "release";
            this.radioButtonRelease.UseVisualStyleBackColor = true;
            // 
            // radioButtonDebug
            // 
            this.radioButtonDebug.AutoSize = true;
            this.radioButtonDebug.Checked = true;
            this.radioButtonDebug.Location = new System.Drawing.Point(12, 15);
            this.radioButtonDebug.Name = "radioButtonDebug";
            this.radioButtonDebug.Size = new System.Drawing.Size(53, 16);
            this.radioButtonDebug.TabIndex = 9;
            this.radioButtonDebug.TabStop = true;
            this.radioButtonDebug.Text = "Debug";
            this.radioButtonDebug.UseVisualStyleBackColor = true;
            // 
            // labelCurrentPath
            // 
            this.labelCurrentPath.AutoSize = true;
            this.labelCurrentPath.Font = new System.Drawing.Font("微软雅黑", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.labelCurrentPath.Location = new System.Drawing.Point(131, 16);
            this.labelCurrentPath.Name = "labelCurrentPath";
            this.labelCurrentPath.Size = new System.Drawing.Size(101, 25);
            this.labelCurrentPath.TabIndex = 8;
            this.labelCurrentPath.Text = "D:/abc.txt";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("微软雅黑", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label2.Location = new System.Drawing.Point(18, 16);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(107, 25);
            this.label2.TabIndex = 7;
            this.label2.Text = "当前目录：";
            // 
            // pictureBox6
            // 
            this.pictureBox6.Image = global::JDF_UI.Properties.Resources.btn_fabu;
            this.pictureBox6.Location = new System.Drawing.Point(197, 224);
            this.pictureBox6.Name = "pictureBox6";
            this.pictureBox6.Size = new System.Drawing.Size(83, 31);
            this.pictureBox6.TabIndex = 6;
            this.pictureBox6.TabStop = false;
            this.pictureBox6.Click += new System.EventHandler(this.pictureBox6_Click);
            // 
            // pictureBox5
            // 
            this.pictureBox5.Image = global::JDF_UI.Properties.Resources.btn_chushu;
            this.pictureBox5.Location = new System.Drawing.Point(61, 224);
            this.pictureBox5.Name = "pictureBox5";
            this.pictureBox5.Size = new System.Drawing.Size(83, 31);
            this.pictureBox5.TabIndex = 5;
            this.pictureBox5.TabStop = false;
            this.pictureBox5.Click += new System.EventHandler(this.pictureBox5_Click);
            // 
            // pictureBox4
            // 
            this.pictureBox4.Image = global::JDF_UI.Properties.Resources.btn_qingchuhuancun;
            this.pictureBox4.Location = new System.Drawing.Point(474, 129);
            this.pictureBox4.Name = "pictureBox4";
            this.pictureBox4.Size = new System.Drawing.Size(83, 31);
            this.pictureBox4.TabIndex = 4;
            this.pictureBox4.TabStop = false;
            this.pictureBox4.Click += new System.EventHandler(this.pictureBox4_Click);
            // 
            // pictureBox3
            // 
            this.pictureBox3.Image = global::JDF_UI.Properties.Resources.btn_chongqi;
            this.pictureBox3.Location = new System.Drawing.Point(333, 129);
            this.pictureBox3.Name = "pictureBox3";
            this.pictureBox3.Size = new System.Drawing.Size(83, 31);
            this.pictureBox3.TabIndex = 3;
            this.pictureBox3.TabStop = false;
            this.pictureBox3.Click += new System.EventHandler(this.pictureBox3_Click);
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = global::JDF_UI.Properties.Resources.btn_guanbi;
            this.pictureBox2.Location = new System.Drawing.Point(197, 129);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(83, 31);
            this.pictureBox2.TabIndex = 2;
            this.pictureBox2.TabStop = false;
            this.pictureBox2.Click += new System.EventHandler(this.pictureBox2_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::JDF_UI.Properties.Resources.btn_bianyi;
            this.pictureBox1.Location = new System.Drawing.Point(61, 129);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(83, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微软雅黑", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
            this.label1.Location = new System.Drawing.Point(18, 69);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(126, 25);
            this.label1.TabIndex = 0;
            this.label1.Text = "初始化选项：";
            // 
            // UC_JDF_UserInterface
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.panel_main);
            this.Name = "UC_JDF_UserInterface";
            this.Size = new System.Drawing.Size(663, 394);
            this.panel_main.ResumeLayout(false);
            this.panel_main.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox6)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox5)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox4)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox3)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel_main;
        private System.Windows.Forms.Label labelCurrentPath;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.PictureBox pictureBox6;
        private System.Windows.Forms.PictureBox pictureBox5;
        private System.Windows.Forms.PictureBox pictureBox4;
        private System.Windows.Forms.PictureBox pictureBox3;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.RadioButton radioButtonRelease;
        private System.Windows.Forms.RadioButton radioButtonDebug;
    }
}
