package com.no_country.demo.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Alumno extends Usuario {
    private Boolean estadoAlumno;
    private Curso cursoActual;
    private List<Evaluacion> evaluaciones;
    private Date fechaInscripcionCurso;
    private Tutor tutor;
}
