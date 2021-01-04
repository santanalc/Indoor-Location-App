package br.com.navigationApp;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import static android.content.ContentValues.TAG;

@NativePlugin()
public class Accelerometer extends Plugin implements SensorEventListener{
    private SensorManager sensorMan;
    private Sensor accelerometer;
    private float[] mGravity;
    private double mAccel;
    private double mAccelCurrent;
    private double mAccelLast;
    private boolean sensorRegistered = false;
    private int hitCount = 0;
    private double hitSum = 0;
    private double hitResult = 0;
    private final int SAMPLE_SIZE = 50; // change this sample size as you want, higher is more precise but slow measure.
    private final double THRESHOLD = 0.2; // change this threshold as you want, higher is more spike movement

    @PluginMethod()
    public void onCreate(PluginCall call) {
        sensorMan = (SensorManager) getActivity().getApplicationContext().getSystemService(Context.SENSOR_SERVICE);
        accelerometer = sensorMan.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mAccel = 0.00f;
        mAccelCurrent = SensorManager.GRAVITY_EARTH;
        mAccelLast = SensorManager.GRAVITY_EARTH;

        sensorMan.registerListener((SensorEventListener) this, accelerometer,SensorManager.SENSOR_DELAY_NORMAL);
        sensorRegistered = true;
    }


    @Override()
    public void onSensorChanged(SensorEvent event) {
        boolean movement = false;
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            mGravity = event.values.clone();
            // Shake detection
            double x = mGravity[0];
            double y = mGravity[1];
            double z = mGravity[2];
            mAccelLast = mAccelCurrent;
            mAccelCurrent = Math.sqrt(x * x + y * y + z * z);
            double delta = mAccelCurrent - mAccelLast;
            mAccel = mAccel * 0.9f + delta;

            if (hitCount <= SAMPLE_SIZE) {
                hitCount++;
                hitSum += Math.abs(mAccel);
            } else {
                hitResult = hitSum / SAMPLE_SIZE;
                Log.d(TAG, String.valueOf(hitResult));
                if (hitResult > THRESHOLD) {
                    Log.d(TAG,"Andando");
                    bridge.triggerWindowJSEvent("myCustomEvent", "{ 'Walking': 'True' }");
                } else {
                    Log.d(TAG, "Parado");
                    bridge.triggerWindowJSEvent("myCustomEvent", "{ 'Walking': 'False' }");
                }

                hitCount = 0;
                hitSum = 0;
                hitResult = 0;
            }

        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
}