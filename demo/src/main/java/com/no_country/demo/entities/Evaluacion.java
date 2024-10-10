package com.no_country.demo.entities;

import com.no_country.demo.entities.enums.Nota;
import com.no_country.demo.entities.enums.TipoEvaluacion;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Evaluacion {
    private Alumno alumno;
    private TipoEvaluacion tipo;
    private Asignatura asignatura;
    private Date fechaEvaluacion;
    private String temasEvaluacion;
    private Nota calificacion;
    private String comentario;
}
