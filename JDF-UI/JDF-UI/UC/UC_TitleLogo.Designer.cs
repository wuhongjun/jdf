namespace JDF_UI
{
    partial class UC_TitleLogo
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
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(UC_TitleLogo));
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.pictureBox_switchBtn_left = new System.Windows.Forms.PictureBox();
            this.imageList1 = new System.Windows.Forms.ImageList(this.components);
            this.pictureBox_switchBtn_right = new System.Windows.Forms.PictureBox();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_switchBtn_left)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_switchBtn_right)).BeginInit();
            this.SuspendLayout();
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.Color.Transparent;
            this.pictureBox1.Image = global::JDF_UI.Properties.Resources.title_logo_v1_0;
            this.pictureBox1.Location = new System.Drawing.Point(27, 3);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(350, 63);
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            // 
            // pictureBox_switchBtn_left
            // 
            this.pictureBox_switchBtn_left.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.pictureBox_switchBtn_left.Image = global::JDF_UI.Properties.Resources.left;
            this.pictureBox_switchBtn_left.Location = new System.Drawing.Point(614, 12);
            this.pictureBox_switchBtn_left.Name = "pictureBox_switchBtn_left";
            this.pictureBox_switchBtn_left.Size = new System.Drawing.Size(57, 50);
            this.pictureBox_switchBtn_left.TabIndex = 1;
            this.pictureBox_switchBtn_left.TabStop = false;
            this.pictureBox_switchBtn_left.Click += new System.EventHandler(this.pictureBox_switchBtn_left_Click);
            this.pictureBox_switchBtn_left.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBox_switchBtn_left_MouseDown);
            this.pictureBox_switchBtn_left.MouseEnter += new System.EventHandler(this.pictureBox_switchBtn_left_MouseEnter);
            this.pictureBox_switchBtn_left.MouseLeave += new System.EventHandler(this.pictureBox_switchBtn_left_MouseLeave);
            // 
            // imageList1
            // 
            this.imageList1.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("imageList1.ImageStream")));
            this.imageList1.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList1.Images.SetKeyName(0, "left.gif");
            this.imageList1.Images.SetKeyName(1, "right.gif");
            // 
            // pictureBox_switchBtn_right
            // 
            this.pictureBox_switchBtn_right.Anchor = System.Windows.Forms.AnchorStyles.Right;
            this.pictureBox_switchBtn_right.Image = global::JDF_UI.Properties.Resources.right;
            this.pictureBox_switchBtn_right.Location = new System.Drawing.Point(614, 12);
            this.pictureBox_switchBtn_right.Name = "pictureBox_switchBtn_right";
            this.pictureBox_switchBtn_right.Size = new System.Drawing.Size(57, 50);
            this.pictureBox_switchBtn_right.TabIndex = 2;
            this.pictureBox_switchBtn_right.TabStop = false;
            this.pictureBox_switchBtn_right.Click += new System.EventHandler(this.pictureBox_switchBtn_right_Click);
            this.pictureBox_switchBtn_right.MouseDown += new System.Windows.Forms.MouseEventHandler(this.pictureBox_switchBtn_right_MouseDown);
            this.pictureBox_switchBtn_right.MouseEnter += new System.EventHandler(this.pictureBox_switchBtn_right_MouseEnter);
            this.pictureBox_switchBtn_right.MouseLeave += new System.EventHandler(this.pictureBox_switchBtn_right_MouseLeave);
            // 
            // UC_TitleLogo
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Control;
            this.BackgroundImage = global::JDF_UI.Properties.Resources.title_bg;
            this.Controls.Add(this.pictureBox_switchBtn_right);
            this.Controls.Add(this.pictureBox_switchBtn_left);
            this.Controls.Add(this.pictureBox1);
            this.Name = "UC_TitleLogo";
            this.Size = new System.Drawing.Size(695, 75);
            this.Load += new System.EventHandler(this.UC_TitleLogo_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_switchBtn_left)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox_switchBtn_right)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.PictureBox pictureBox_switchBtn_left;
        private System.Windows.Forms.ImageList imageList1;
        private System.Windows.Forms.PictureBox pictureBox_switchBtn_right;
    }
}
